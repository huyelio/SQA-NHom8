import { STORAGE_KEY } from "@/constants/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

type StandHourStorage = {
  date: string;
  stoodHourSet: number[];
};

export function useStandHours(ready: boolean, activeMinutes: number) {
  const [stoodHours, setStoodHours] = useState(0);

  const lastActiveMinuteRef = useRef(0);

  useEffect(() => {
    if (!ready) return;

    const now = dayjs();
    const todayKey = now.format("YYYY-MM-DD");
    const currentHour = now.hour();

    const init = async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY.STAND_HOURS);
      const stored: StandHourStorage | null = raw ? JSON.parse(raw) : null;

      // ===== Reset ngày mới =====
      if (!stored || stored.date !== todayKey) {
        const next: StandHourStorage = {
          date: todayKey,
          stoodHourSet: [],
        };

        setStoodHours(0);
        await AsyncStorage.setItem(
          STORAGE_KEY.STAND_HOURS,
          JSON.stringify(next)
        );
        return;
      }

      // ===== Detect có active minute mới =====
      if (activeMinutes > lastActiveMinuteRef.current) {
        lastActiveMinuteRef.current = activeMinutes;

        if (!stored.stoodHourSet.includes(currentHour)) {
          const nextSet = [...stored.stoodHourSet, currentHour];

          const next: StandHourStorage = {
            date: todayKey,
            stoodHourSet: nextSet,
          };

          setStoodHours(nextSet.length);
          await AsyncStorage.setItem(
            STORAGE_KEY.STAND_HOURS,
            JSON.stringify(next)
          );
        } else {
          setStoodHours(stored.stoodHourSet.length);
        }
      } else {
        setStoodHours(stored.stoodHourSet.length);
      }
    };

    init();
  }, [ready, activeMinutes]);

  return { stoodHours };
}
