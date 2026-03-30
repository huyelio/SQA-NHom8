// goalSchema.ts
import { z } from "zod";

const goalSchema = z.object({
  height_cm: z
    .string()
    .min(1, "Nhập chiều cao")
    .refine((v) => Number(v) > 0, "Chiều cao không hợp lệ"),

  weight_kg: z
    .string()
    .min(1, "Nhập cân nặng hiện tại")
    .refine((v) => Number(v) > 0, "Cân nặng không hợp lệ"),

  aim_weight: z
    .string()
    .min(1, "Nhập cân nặng mong muốn")
    .refine((v) => Number(v) > 0, "Cân nặng không hợp lệ"),

  aim_day: z.string().min(1, "Nhập ngày đạt mục tiêu"),

  day_of_activities: z
    .string()
    .min(1, "Nhập số ngày tập")
    .refine((v) => Number(v) >= 0 && Number(v) <= 7, "Số ngày tập phải từ 0–7"),

  activity_level: z.enum([
    "sedentary",
    "lightly_active",
    "moderately_active",
    "very_active",
    "extremely_active",
  ]),
});

type GoalForm = z.infer<typeof goalSchema>;

export { goalSchema, type GoalForm };
