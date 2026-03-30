export const ORDER_STATUS_DISPLAY: Record<string, string> = {
  PENDING: "Chờ xử lý",
  PAID: "Đã thanh toán",
  SHIPPED: "Đang giao hàng",
  COMPLETED: "Đã giao",
  CANCELLED: "Đã hủy",
  CANCEL_REQUESTED: "Chờ hoàn tiền",
  REFUNDED: "Đã hoàn tiền",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING: "#F59E0B",
  PAID: "#10B981",
  SHIPPED: "#3B82F6",
  COMPLETED: "#22C55E",
  CANCELLED: "#EF4444",
  CANCEL_REQUESTED: "#F97316",
  REFUNDED: "#8B5CF6",
};

export const ORDER_STATUS = [
  { key: "ALL", label: "Tất cả" },
  { key: "PENDING", label: "Chờ xử lý" },
  { key: "PAID", label: "Đã thanh toán" },
  { key: "SHIPPED", label: "Đang giao hàng" },
  { key: "COMPLETED", label: "Đã giao" },
  { key: "CANCELLED", label: "Đã hủy" },
  { key: "CANCEL_REQUESTED", label: "Chờ hoàn tiền" },
  { key: "REFUNDED", label: "Đã hoàn tiền" },
];
