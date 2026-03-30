import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function setupNotificationChannel() {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync("medication", {
    name: "Nhắc uống thuốc",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#8B5CF6",
    sound: "default",
  });
}
