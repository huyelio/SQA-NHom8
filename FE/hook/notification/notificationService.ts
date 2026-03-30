import { WEEKDAY_MAP } from "@/constants/medication";
import { Medication } from "@/types/medication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
// hooks/useMedicationList.ts
import { useQuery } from "@tanstack/react-query";
import { getListNoti } from "@/services/api/medication/medication";
import { useEffect } from "react";

const STORAGE_KEY = {
  MEDICATION_NOTIFICATION_MAP: "MEDICATION_NOTIFICATION_MAP",
};

type NotificationMap = Record<number, string[]>;
// scheduleId -> notificationId
// lấy danh sách id schedule của OS
async function getNotificationMap(): Promise<NotificationMap> {
  const raw = await AsyncStorage.getItem(
    STORAGE_KEY.MEDICATION_NOTIFICATION_MAP
  );
  return raw ? (JSON.parse(raw) as NotificationMap) : {};
}

// lưu danh sách id schedule của OS
async function saveNotificationMap(map: NotificationMap) {
  await AsyncStorage.setItem(
    STORAGE_KEY.MEDICATION_NOTIFICATION_MAP,
    JSON.stringify(map)
  );
}

export const addNotificationsForSchedule = async (
  scheduleId: number,
  notificationIds: string[]
) => {
  const map = await getNotificationMap();

  map[scheduleId] = notificationIds;

  await saveNotificationMap(map);
};

export const getNotificationsByScheduleId = async (
  scheduleId: number
): Promise<string[]> => {
  const map = await getNotificationMap();
  return map[scheduleId] ?? [];
};

// hàm tạo schedule nhắc hằng ngày
const createDailySchedule = async (
  medication: Medication
): Promise<string[]> => {
  const ids: string[] = [];

  for (const daily of medication.schedules) {
    const [hour, minute] = daily.time.split(":").map(Number);

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nhắc uống thuốc",
        body: `Bạn cần uống ${daily.dosage} ${daily.unitName ?? ""} ${
          medication.drugName
        }`,
        data: {
          medicationId: medication.id,
          frequencyType: "DAILY",
          time: daily.time,
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });

    ids.push(id);
  }

  return ids;
};

// hàm tạo schedule nhắc theo tuần
const createWeeklySchedule = async (
  medication: Medication
): Promise<string[]> => {
  const ids: string[] = [];

  for (const day of medication.daysOfWeek) {
    const weekday = WEEKDAY_MAP[day]; // 1–7
    if (!weekday) continue;

    for (const schedule of medication.schedules) {
      const [hour, minute] = schedule.time.split(":").map(Number);

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Nhắc uống thuốc",
          body: `Bạn cần uống ${schedule.dosage} ${schedule.unitName ?? ""} ${
            medication.drugName
          }`,
          data: {
            medicationId: medication.id,
            frequencyType: "WEEKLY",
            weekday: day,
            time: schedule.time,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          weekday, // 1–7
          hour,
          minute,
        },
      });

      ids.push(id);
    }
  }

  return ids;
};

// hàm tạo schedule nhắc cách ngày
const addDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const createIntervalSchedule = async (
  medication: Medication
): Promise<string[]> => {
  const ids: string[] = [];

  if (!medication.intervalDays || medication.intervalDays <= 0) return ids;

  const [hour, minute] = medication.schedules[0].time.split(":").map(Number);

  const now = new Date();
  const first = new Date();
  first.setHours(hour, minute, 0, 0);

  if (first <= now) {
    first.setDate(first.getDate() + 1);
  }

  const intervalSeconds = medication.intervalDays * 24 * 60 * 60;
  const initialDelaySeconds = Math.max(
    1,
    Math.floor((first.getTime() - now.getTime()) / 1000)
  );

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Nhắc uống thuốc",
      body: `Bạn cần uống ${medication.schedules[0].dosage} ${
        medication.schedules[0].unitName ?? ""
      } ${medication.drugName}`,
      data: {
        medicationId: medication.id,
        frequencyType: "INTERVAL",
        intervalDays: medication.intervalDays,
        time: medication.schedules[0].time,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: initialDelaySeconds, // ⏱️ lần đầu đúng giờ
      repeats: true, // 🔁 các lần sau cách đều
    },
  });

  ids.push(id);
  return ids;
};

export const cancelMedicationNotification = async (scheduleId: number) => {
  const map = await getNotificationMap();
  const ids = map[scheduleId];

  if (!ids?.length) return;

  for (const id of ids) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  delete map[scheduleId];
  await saveNotificationMap(map);
};

export const updateMedicationNotification = async (schedule: Medication) => {
  await cancelMedicationNotification(schedule.id);
  await scheduleMedicationNotification(schedule);
};

export const scheduleMedicationNotification = async (schedule: Medication) => {
  let ids: string[] = [];

  switch (schedule.frequencyType) {
    case "DAILY":
      ids = await createDailySchedule(schedule);
      break;

    case "WEEKLY":
      ids = await createWeeklySchedule(schedule);
      break;

    case "INTERVAL":
      ids = await createIntervalSchedule(schedule);
      break;
  }

  if (ids.length > 0) {
    await addNotificationsForSchedule(schedule.id, ids);
  }

  return ids;
};

export async function syncMedicationNotifications(schedules: Medication[]) {
  const map = await getNotificationMap();

  for (const ids of Object.values(map)) {
    for (const id of ids) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
  }

  await clearAllOSNotifications();

  await saveNotificationMap({});
  for (const schedule of schedules) {
    await scheduleMedicationNotification(schedule);
  }

  const all = await Notifications.getAllScheduledNotificationsAsync();

  console.log(
    all.map((n) => ({
      id: n.identifier,
      time: n.trigger,
      data: n.content.data,
    }))
  );
}

export const clearAllOSNotifications = async () => {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  for (const n of scheduled) {
    await Notifications.cancelScheduledNotificationAsync(n.identifier);
  }

  await AsyncStorage.removeItem("MEDICATION_NOTIFICATION_MAP");
};

export const MEDICATION_NOTI_QUERY_KEY = ["medications", "active"];

export function useMedicationList() {
  return useQuery<Medication[]>({
    queryKey: MEDICATION_NOTI_QUERY_KEY,
    queryFn: getListNoti,
    staleTime: 1000 * 60 * 5,
  });
}

export function useMedicationNotificationSync() {
  const { data, isLoading, isSuccess } = useMedicationList();

  useEffect(() => {
    if (!isSuccess) return;
    if (!Array.isArray(data)) return;

    syncMedicationNotifications(data);
  }, [data, isSuccess]);

  return {
    medications: data ?? [],
    isLoading,
  };
}
