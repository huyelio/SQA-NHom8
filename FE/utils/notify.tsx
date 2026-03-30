import { NotifyTypeEnum } from "@/constants/notify";
import Toast from "react-native-toast-message";

// ===== ENUM MAPPING =====
const TYPE_MAP: Record<NotifyTypeEnum, "success" | "error" | "info"> = {
  [NotifyTypeEnum.SUCCESS]: "success",
  [NotifyTypeEnum.ERROR]: "error",
  [NotifyTypeEnum.INFO]: "info",
  [NotifyTypeEnum.WARNING]: "info",
  [NotifyTypeEnum.DEFAULT]: "info"
};

// ===== DEFAULT OPTIONS =====
const DEFAULT_NOTIFY_OPTIONS = {
  position: "top" as const,
  visibilityTime: 4000,
  autoHide: true,
  topOffset: 50
};

// ===== MAIN NOTIFY FUNCTION =====
export const notify = (
  msg: string,
  type: NotifyTypeEnum = NotifyTypeEnum.DEFAULT,
  options?: Partial<typeof DEFAULT_NOTIFY_OPTIONS>
) => {
  const mappedType = TYPE_MAP[type] || "info";

  Toast.show({
    type: mappedType,
    text1: msg,
    ...DEFAULT_NOTIFY_OPTIONS,
    ...options
  });
};