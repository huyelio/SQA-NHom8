import { z } from "zod";
import { LoginSchema } from "./loginSchema";

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(1, "Hãy nhập tên"),
  dateOfBirth: z.string().min(1, "Hãy nhập ngày sinh"),
  gender: z.string().min(1, "Hãy chọn giới tính"),
  checkPassword: z.string(),
}).refine((data) => data.password === data.checkPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["checkPassword"],
});

export type RegisterFromData = z.infer<typeof RegisterSchema>;
