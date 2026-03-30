import { BlobShape } from "@/components/appComponents/BlobShape";
import { STORAGE_KEY } from "@/constants/common";
import { useAuth } from "@/context/AuthContext";
import { LoginFormData, LoginSchema } from "@/schema/loginSchema";
import { Colors, SafeAreaViewStyles } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../styles/login/styles";

const { GOOGLE_LOGIN_URL } = Constants.expoConfig?.extra as {
  GOOGLE_LOGIN_URL: string;
};

const getSavedLogin = async (): Promise<{
  username: string;
  password: string;
} | null> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY.SAVED_LOGIN);
  return raw ? JSON.parse(raw) : null;
};

const LoginScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { login, loginLoading } = useAuth();
  const router = useRouter();

  const { control, handleSubmit, setValue } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    (async () => {
      const saved = await getSavedLogin();
      if (saved) {
        setValue("email", saved.username);
        setValue("password", saved.password);
      }
    })();
  }, []);

  const handleLogin = (payload: LoginFormData) => {
    login(payload);
  };

  const handleGoogleLogin = async () => {
    try {
      const supported = await Linking.canOpenURL(GOOGLE_LOGIN_URL);

      if (!supported) {
        Alert.alert("Lỗi", "Không thể mở trình duyệt");
        return;
      }

      await Linking.openURL(GOOGLE_LOGIN_URL);
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng nhập Google");
    }
  };

  return (
    <SafeAreaView
      style={[
        SafeAreaViewStyles.SafeAreaView,
        { backgroundColor: Colors.background },
      ]}
    >
      {/* ---- Blob background ---- */}
      <View style={{ position: "absolute", width: "100%", height: "100%" }}>
        <BlobShape
          height={350}
          width={200}
          rotate="25deg"
          rx={80}
          ry={80}
          top={0}
          right={300}
          opacity={0.25}
        />
        <BlobShape
          height={400}
          width={200}
          rotate="70deg"
          rx={80}
          ry={120}
          top={500}
          right={300}
          opacity={0.25}
        />
        <BlobShape
          height={400}
          width={200}
          rotate="0deg"
          rx={80}
          ry={120}
          top={190}
          right={-30}
          opacity={0.25}
        />
      </View>

      {/* ---- Header ---- */}
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>HealthCare</Text>
        </View>
        <Text style={styles.signature}>Hãy bảo vệ sức khỏe của chính mình</Text>
      </View>

      {/* ---- Form ---- */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formCard}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#8E8E8E"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                selectionColor={Colors.text_primary}
              />
            )}
          />

          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { paddingRight: 40 }]}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#8E8E8E"
                  secureTextEntry={!isVisible}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  selectionColor={Colors.text_primary}
                />
              )}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Ionicons
                name={isVisible ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#7C7C7C"
              />
            </Pressable>
          </View>

          {/* ---- Buttons ---- */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              loginLoading && styles.btnDisable,
              pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
            ]}
            onPress={handleSubmit(handleLogin)}
            disabled={loginLoading}
          >
            <Text
              style={[styles.primaryText, loginLoading && styles.textDisable]}
            >
              Đăng nhập
            </Text>
          </Pressable>

          <Pressable onPress={() => {}}>
            <Text style={styles.linkText}>Quên mật khẩu?</Text>
          </Pressable>

          <Pressable onPress={() => router.push("/(screen)/register")}>
            <Text
              style={[styles.linkText, { textDecorationLine: "underline" }]}
            >
              Đăng ký tài khoản mới
            </Text>
          </Pressable>

          {/* ---- Social Login ---- */}
          <Pressable
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            disabled={loginLoading}
          >
            <Image
              source={{
                uri: "https://developers.google.com/identity/images/g-logo.png",
              }}
              style={{ width: 28, height: 28 }}
            />
            <Text style={styles.googleText}>Đăng nhập với Google</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
