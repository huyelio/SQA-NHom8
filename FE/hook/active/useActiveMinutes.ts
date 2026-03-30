import { STORAGE_KEY } from "@/constants/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { Pedometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { AppState, Platform } from "react-native";

const STEP_THRESHOLD = 100;
const ONE_MINUTE = 60_000;

type ActiveMinuteStorage = {
  date: string; // YYYY-MM-DD
  activeMinutes: number;
  lastStepCount: number;
  lastUpdatedAt: number; // timestamp lúc app background
};

export function useActiveMinutesUnified(ready: boolean) {
  const [activeMinutes, setActiveMinutes] = useState(0);

  // ===== refs =====
  const stepBufferRef = useRef(0);
  const lastStepCountRef = useRef(0);
  const currentDateRef = useRef<string | null>(null);

  const minuteIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const minuteAlignTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const subscriptionRef = useRef<any>(null);
  const currentMinuteRef = useRef(0);

  // ===== Android estimate =====
  const canEstimateRef = useRef(false);
  const estimatedRef = useRef(false);

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;

    const persist = async (payload: ActiveMinuteStorage) => {
      await AsyncStorage.setItem(
        STORAGE_KEY.ACTIVE_MINUTES,
        JSON.stringify(payload)
      );
    };

    const onMinuteTick = async () => {
      const stepsThisMinute = stepBufferRef.current;
      stepBufferRef.current = 0;

      // ===== ANDROID: estimate 1 phút (chỉ 1 lần) =====
      if (
        Platform.OS === "android" &&
        canEstimateRef.current &&
        !estimatedRef.current &&
        stepsThisMinute >= STEP_THRESHOLD
      ) {
        estimatedRef.current = true;
        canEstimateRef.current = false;

        lastStepCountRef.current += stepsThisMinute;

        setActiveMinutes((prev) => {
          const next = prev + 1;

          persist({
            date: currentDateRef.current!,
            activeMinutes: next,
            lastStepCount: lastStepCountRef.current,
            lastUpdatedAt: dayjs().valueOf(),
          });

          return next;
        });

        return; // ⛔ chỉ estimate 1 lần
      }

      // ===== Normal active minute =====
      if (stepsThisMinute >= STEP_THRESHOLD) {
        lastStepCountRef.current += stepsThisMinute;

        setActiveMinutes((prev) => {
          const next = prev + 1;

          persist({
            date: currentDateRef.current!,
            activeMinutes: next,
            lastStepCount: lastStepCountRef.current,
            lastUpdatedAt: dayjs().valueOf(),
          });

          return next;
        });
      }
    };

    const init = async () => {
      const available = await Pedometer.isAvailableAsync();
      if (!available || cancelled) return;

      const now = dayjs();
      const todayKey = now.format("YYYY-MM-DD");

      // ===== Load storage =====
      const raw = await AsyncStorage.getItem(STORAGE_KEY.ACTIVE_MINUTES);
      const stored: ActiveMinuteStorage | null = raw ? JSON.parse(raw) : null;

      // ===== Reset khi sang ngày mới =====
      if (currentDateRef.current !== todayKey) {
        currentDateRef.current = todayKey;
        stepBufferRef.current = 0;
        estimatedRef.current = false;
        canEstimateRef.current = false;
        setActiveMinutes(0);
      }

      // ===== Detect resume (Android estimate condition) =====
      if (Platform.OS === "android" && stored && stored.date === todayKey) {
        const deltaMinutes = dayjs().diff(
          dayjs(stored.lastUpdatedAt),
          "minute"
        );

        if (deltaMinutes >= 1) {
          canEstimateRef.current = true;
        }
      }

      // ===== iOS resume chuẩn =====
      let baseActiveMinutes = 0;

      if (stored && stored.date === todayKey && Platform.OS === "ios") {
        const startOfDay = now.startOf("day").toDate();
        const result = await Pedometer.getStepCountAsync(
          startOfDay,
          now.toDate()
        );

        const deltaSteps = Math.max(result.steps - stored.lastStepCount, 0);

        const deltaMinutes = Math.floor(
          now.diff(dayjs(stored.lastUpdatedAt), "minute", true)
        );

        const possibleMinutes = Math.floor(deltaSteps / STEP_THRESHOLD);
        const addMinutes = Math.min(deltaMinutes, possibleMinutes);

        baseActiveMinutes = stored.activeMinutes + addMinutes;
        lastStepCountRef.current = result.steps;
      } else if (stored && stored.date === todayKey) {
        baseActiveMinutes = stored.activeMinutes;
        lastStepCountRef.current = stored.lastStepCount;
      }

      setActiveMinutes(baseActiveMinutes);

      await persist({
        date: todayKey,
        activeMinutes: baseActiveMinutes,
        lastStepCount: lastStepCountRef.current,
        lastUpdatedAt: now.valueOf(),
      });

      // ===== Realtime buffer =====
      subscriptionRef.current = Pedometer.watchStepCount((result) => {
        const now = Date.now();
        const minuteKey = Math.floor(now / ONE_MINUTE);

        if (minuteKey !== currentMinuteRef.current) {
          currentMinuteRef.current = minuteKey;
          stepBufferRef.current = 0;
        }

        stepBufferRef.current += result.steps;
      });
      // ===== Align minute =====
      const msToNextMinute =
        ONE_MINUTE - (now.second() * 1000 + now.millisecond());

      minuteAlignTimeoutRef.current = setTimeout(() => {
        onMinuteTick();
        minuteIntervalRef.current = setInterval(onMinuteTick, ONE_MINUTE);
      }, msToNextMinute);
    };

    init();

    // ===== Save lastUpdatedAt khi app background =====
    const appStateSub = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        AsyncStorage.getItem(STORAGE_KEY.ACTIVE_MINUTES).then((raw) => {
          if (!raw) return;
          const stored: ActiveMinuteStorage = JSON.parse(raw);
          persist({
            ...stored,
            lastUpdatedAt: Date.now(),
          });
        });
      }
    });

    return () => {
      cancelled = true;

      appStateSub.remove();

      subscriptionRef.current?.remove();
      subscriptionRef.current = null;

      if (minuteIntervalRef.current) {
        clearInterval(minuteIntervalRef.current);
        minuteIntervalRef.current = null;
      }

      if (minuteAlignTimeoutRef.current) {
        clearTimeout(minuteAlignTimeoutRef.current);
        minuteAlignTimeoutRef.current = null;
      }
    };
  }, [ready]);

  return { activeMinutes };
}
