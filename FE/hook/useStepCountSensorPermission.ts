import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

export type PedometerPermissionStatus = "granted" | "denied" | "undetermined";

export function usePedometerPermission() {
  const [status, setStatus] =
    useState<PedometerPermissionStatus>("undetermined");

  // kiểm tra thiết bị + permission hiện tại
  const checkPermission = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (!isAvailable) {
      setStatus("denied");
      return false;
    }

    const settings = await Pedometer.getPermissionsAsync();
    setStatus(settings.status as PedometerPermissionStatus);
    return settings.status === "granted";
  };

  // xin quyền
  const requestPermission = async () => {
    await Pedometer.requestPermissionsAsync();

    const refreshed = await Pedometer.getPermissionsAsync();
    setStatus(refreshed.status as PedometerPermissionStatus);

    return refreshed.status === "granted";
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
