import axiosInstance from "@/services/axiosInstance";

export async function createOrder(payload: any) {
  const response = await axiosInstance.post("/orders", payload);
  return response;
}

export const getMyOrders = async (
  page: number,
  selectedStatus: string | undefined
) => {
  const res = await axiosInstance.get("/orders", {
    params: {
      status: selectedStatus ?? "",
      page,
      size: 10,
      sort: "createdAt,desc",
    },
  });
  return res.data;
};

export const cancelOrder = async (orderId: number) => {
  const res = await axiosInstance.put(`/orders/${orderId}/cancel`);
  return res.data;
};

export const getVnpayQr = async (orderId: number) => {
  const res = await axiosInstance.post(`/payments/vnpay/${orderId}`);
  return res.data; // { qrCodeUrl }
};

export const getOrderDetail = async (orderId: number) => {
  const res = await axiosInstance.get(`/orders/${orderId}`);
  return res.data;
};
export const confirmCod = async (orderId: number) => {
  const res = await axiosInstance.post(`/orders/${orderId}/confirm-cod`);
  return res.data;
};


