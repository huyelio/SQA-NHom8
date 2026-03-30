import { FREQUENCY } from "@/constants/medication";
import { z } from "zod";

export const ScheduleSchema = z.array(
  z.object({
    time: z.string().regex(/^\d{2}:\d{2}$/),
    dosage: z.number().min(0.25),
  })
);

export type ScheduleData = z.infer<typeof ScheduleSchema>;

export const medicationSchema = z
  .object({
    drug_id: z.number().optional(),
    drug_name: z.string().min(1, "Hãy cung cấp tên thuốc"),

    unit_id: z.number(),

    start_date: z.date(),
    end_date: z.date().optional(),
    note: z.string().optional(),

    frequency_type: z.enum(["DAILY", "INTERVAL", "WEEKLY"]),
    interval_days: z
      .string()
      .optional()
      .transform((value) => (value ? Number(value) : undefined)),
    days_of_week: z.array(
      z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ])
    ),

    schedules: ScheduleSchema.min(1, "Hãy thêm thời gian nhắc nhở"),
  })
  .refine(
    (d) => {
      if (d.frequency_type === FREQUENCY.INTERVAL) {
        return d.interval_days !== undefined && d.interval_days >= 1;
      }
      return true;
    },
    {
      message: "interval_days là bắt buộc khi tần suất là INTERVAL",
      path: ["interval_days"],
    }
  )
  .refine(
    (d) => {
      if (d.frequency_type === FREQUENCY.WEEKLY) {
        return d.days_of_week && d.days_of_week.length > 0;
      }
      return true;
    },
    {
      message: "Chọn ít nhất 1 ngày trong tuần",
      path: ["days_of_week"],
    }
  );

export type AddReminderMedicationForm = z.input<typeof medicationSchema>;
export type AddReminderMedicationData = z.output<typeof medicationSchema>;
