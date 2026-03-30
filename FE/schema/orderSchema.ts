import { z } from "zod";

export const orderSchema = z.object({
  receiverName: z.string().min(1, "Vui lòng nhập tên người nhận"),
  receiverPhone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ"),
  shippingAddress: z
    .string()
    .min(5, "Vui lòng nhập địa chỉ giao hàng"),
});

export type OrderForm = z.infer<typeof orderSchema>;
