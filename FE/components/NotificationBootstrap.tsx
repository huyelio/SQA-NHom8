import { useMedicationNotificationSync } from "@/hook/notification/notificationService";

export default function NotificationBootstrap() {
  useMedicationNotificationSync();
  return null;
}
