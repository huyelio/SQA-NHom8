import { FREQUENCY, WEEK_DAYS } from "@/constants/medication";

export type MedicationTimeSchedule = {
  time: string; // "HH:mm:ss"
  dosage: number;
  unitName: string | null;
};

export type Medication = {
  id: number;
  drugName: string;
  note: string | null;
  frequencyType: "DAILY" | "WEEKLY" | "INTERVAL";
  intervalDays: number | null;
  daysOfWeek: WEEK_DAYS[];
  schedules: MedicationTimeSchedule[];
  // status: number; // 0 = active
  edited?: boolean;
};

export interface MedicationSchedule {
  id: number;
  scheduleId: number;
  drugName: string;
  dosage: number;
  time: string; // "HH:mm"
  status: number; // 0 = active, 1 = paused, 2 = stopped (tuỳ BE)
  edited: boolean;
  prescriptionName: string | null;
  unitName: string | null;
  note: string | null;
  frequencyType: FREQUENCY;
  daysOfWeek: WEEK_DAYS[];
  intervalDays: number | null;
}
