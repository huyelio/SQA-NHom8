import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "@/components/appComponents/Loading";

export default function Index() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/activites" />;
  }

  return <Redirect href="/(screen)/login" />;
}
