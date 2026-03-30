import { STORAGE_KEY } from "@/constants/common";
import { postStep } from "@/services/api/food/addFood";
import { getStepToDayInfor } from "@/services/api/profile/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Pedometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

type AndroidDailyStepStorage = {
  date: string; // YYYY-MM-DD
  baseStep: number; // sensorSteps offset
  lastSensorStep: number; // last raw sensor value
  lastSyncedSteps?: number; // last synced to BE
  syncedAt?: number;
};

export function useStepCounter(ready: boolean) {
  const [stepsToday, setStepsToday] = useState(0);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const androidStoredRef = useRef<AndroidDailyStepStorage | null>(null);
  const androidBaseRef = useRef<number | null>(null);

  const currentStepsRef = useRef(0);
  const lastSyncedStepRef = useRef(0);
  const isSyncingRef = useRef(false);

  // lifecycle flags
  const didLoadStorageRef = useRef(false); // đã load AsyncStorage
  const didHandleFirstSensorRef = useRef(false); // đã xử lý sensor event đầu tiên

  const queryClient = useQueryClient();

  const postStepsMutation = useMutation({
    mutationFn: postStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["target"] });
    },
  });

  const restoreFromServer = async (sensorSteps: number) => {
    try {
      const res = await getStepToDayInfor();
      const serverTodaySteps = res?.logs?.[0]?.total_steps ?? 0;

      const baseStep = Math.max(sensorSteps - serverTodaySteps, sensorSteps);

      const stored: AndroidDailyStepStorage = {
        date: dayjs().format("YYYY-MM-DD"),
        baseStep,
        lastSensorStep: sensorSteps,
        lastSyncedSteps: serverTodaySteps,
        syncedAt: Date.now(),
      };

      androidStoredRef.current = stored;
      androidBaseRef.current = baseStep;
      currentStepsRef.current = serverTodaySteps;
      lastSyncedStepRef.current = serverTodaySteps;

      setStepsToday(serverTodaySteps);

      await AsyncStorage.setItem(
        STORAGE_KEY.ANDROID_DAILY_STEP,
        JSON.stringify(stored)
      );
    } catch (e) {
      console.warn("Restore step from server failed", e);
    }
  };

  const flushStepData = async () => {
    if (!androidStoredRef.current) return;
    if (isSyncingRef.current) return;

    const todaySteps = currentStepsRef.current;

    // threshold chống spam
    if (Math.abs(todaySteps - lastSyncedStepRef.current) < 20) return;

    isSyncingRef.current = true;

    try {
      const stored = {
        ...androidStoredRef.current,
        lastSyncedSteps: todaySteps,
        syncedAt: Date.now(),
      };

      await AsyncStorage.setItem(
        STORAGE_KEY.ANDROID_DAILY_STEP,
        JSON.stringify(stored)
      );

      postStepsMutation.mutate(todaySteps, {
        onSuccess: () => {
          lastSyncedStepRef.current = todaySteps;
          androidStoredRef.current = stored;
        },
      });
    } finally {
      isSyncingRef.current = false;
    }
  };

  useEffect(() => {
    if (!ready) return;

    let subscription: any;

    const init = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);
      if (!available) return;

      //LOAD ASYNC STORAGE (1 LẦN)
      if (Platform.OS === "android") {
        const raw = await AsyncStorage.getItem(STORAGE_KEY.ANDROID_DAILY_STEP);
        if (raw) {
          const parsed: AndroidDailyStepStorage = JSON.parse(raw);

          androidStoredRef.current = parsed;
          androidBaseRef.current = parsed.baseStep;

          const restoredSteps = Math.max(
            parsed.lastSensorStep - parsed.baseStep,
            0
          );

          currentStepsRef.current = restoredSteps;
          lastSyncedStepRef.current = parsed.lastSyncedSteps ?? 0;

          setStepsToday(restoredSteps);
        }

        didLoadStorageRef.current = true;
      }

      // ===== SENSOR SUBSCRIBE =====
      subscription = Pedometer.watchStepCount(async (result) => {
        // ===== iOS =====
        if (Platform.OS !== "android") {
          setStepsToday((prev) => prev + result.steps);
          return;
        }

        /**
         * ===== FIRST SENSOR EVENT =====
         * - bỏ qua update
         * - dùng để restore nếu rebuild / fresh install
         */
        if (!didHandleFirstSensorRef.current) {
          didHandleFirstSensorRef.current = true;

          if (!androidStoredRef.current) {
            await restoreFromServer(result.steps);
          }

          return;
        }

        const todayKey = dayjs().format("YYYY-MM-DD");
        let stored = androidStoredRef.current;

        // ===== NEW DAY =====
        if (!stored || stored.date !== todayKey) {
          const newStored: AndroidDailyStepStorage = {
            date: todayKey,
            baseStep: result.steps,
            lastSensorStep: result.steps,
          };

          androidStoredRef.current = newStored;
          androidBaseRef.current = result.steps;

          currentStepsRef.current = 0;
          setStepsToday(0);

          await AsyncStorage.setItem(
            STORAGE_KEY.ANDROID_DAILY_STEP,
            JSON.stringify(newStored)
          );
          return;
        }

        // ===== REBOOT DETECT =====
        const rebootDetected =
          result.steps === 0 || result.steps < stored.lastSensorStep - 1000;

        if (rebootDetected) {
          stored.baseStep = result.steps;
          stored.lastSensorStep = result.steps;
          androidBaseRef.current = result.steps;
        }

        if (androidBaseRef.current === null) {
          androidBaseRef.current = stored.baseStep;
        }

        // ===== NORMAL UPDATE =====
        const todaySteps = Math.max(result.steps - androidBaseRef.current, 0);

        setStepsToday(todaySteps);

        stored.lastSensorStep = result.steps;
        androidStoredRef.current = stored;
        currentStepsRef.current = todaySteps;

        if (todaySteps % 50 === 0) {
          AsyncStorage.setItem(
            STORAGE_KEY.ANDROID_DAILY_STEP,
            JSON.stringify(stored)
          );
        }
      });
    };

    init();

    return () => {
      subscription?.remove();
      androidBaseRef.current = null;
      didHandleFirstSensorRef.current = false;
    };
  }, [ready]);

  // PERIODIC SYNC
  useEffect(() => {
    if (!ready) return;

    const interval = setInterval(flushStepData, 60_000);
    return () => clearInterval(interval);
  }, [ready]);

  return {
    stepsToday,
    isAvailable,
  };
}
