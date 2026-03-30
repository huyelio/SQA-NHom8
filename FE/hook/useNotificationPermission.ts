import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

export type NotificationPermissionStatus =
  | "granted"
  | "denied"
  | "undetermined";

export function useNotificationPermission() {
  // kiểm tra đã được cấp quyền chưa
  const [status, setStatus] =
    useState<NotificationPermissionStatus>("undetermined");

  const checkPermission = async () => {
    const settings = await Notifications.getPermissionsAsync();
    setStatus(settings.status as NotificationPermissionStatus);
    return settings.status === "granted";
  };

  const requestPermission = async () => {
    const settings = await Notifications.requestPermissionsAsync();
    setStatus(settings.status as NotificationPermissionStatus);
    return settings.status === "granted";
  };

  useEffect(() => {
    (async () => {
      const granted = await checkPermission();
      if (!granted) {
        await requestPermission();
      }
    })();

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        checkPermission();
      }
    });

    return () => subscription.remove();
  }, []);

  return {
    status,
    checkPermission,
    requestPermission,
  };
}
