import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import * as Notifications from "expo-notifications";
import * as NavigationBar from "expo-navigation-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { setupNotificationChannel } from "@/hook/notificationChannel";
import NotificationBootstrap from "@/components/NotificationBootstrap";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import Toast from "react-native-toast-message";
import { toastConfig } from "@/utils/toastConfig";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    SplashScreen.hideAsync();

    (async () => {
      await NavigationBar.setVisibilityAsync("hidden");

      await NavigationBar.setBehaviorAsync("overlay-swipe");
    })();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
//set noti hiển thị khi app đang mở
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient();

function RootLayoutNav() {
  //set notification channel
  useEffect(() => {
    setupNotificationChannel();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AuthProvider>
            <ActionSheetProvider>
              <>
                <NotificationBootstrap />
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="(screen)" />
                  <Stack.Screen
                    name="modal"
                    options={{ presentation: "modal" }}
                  />
                </Stack>
                <StatusBar style="light" />
                <Toast config={toastConfig} />
              </>
            </ActionSheetProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
