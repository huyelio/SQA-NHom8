import { STORAGE_KEY } from "@/constants/common";
import { NotifyTypeEnum } from "@/constants/notify";
import { resendMail, verifyRegister } from "@/services/api/auth/register";
import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { VerifyRegisterPayload } from "@/types/register";
import { notify } from "@/utils/notify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  email: string;
};

const VerifyCodeScreen = ({ email }: Props) => {
  const [code, setCode] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const verifyRegisterMutation = useMutation({
    mutationFn: (payload: VerifyRegisterPayload) => verifyRegister(payload),
    onSuccess: async (res: any) => {
      await AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, res.accessToken);
      await AsyncStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, res.refreshToken);
      notify(res?.message || "Đăng ký thành công", NotifyTypeEnum.SUCCESS);
      router.replace("/(tabs)/activites");
    },
    onError: (error: any) => {
      notify(error.message || "Lỗi kết nối máy chủ", NotifyTypeEnum.ERROR);
    },
  });

  const handleVerify = () => {
    const payload = {
      email,
      code,
    };
    verifyRegisterMutation.mutate(payload);
  };

  const resendMailMutation = useMutation({
    mutationFn: (email: string) => resendMail(email),
    onSuccess: (response: any) => {
      notify(
        response?.data?.message || "Mã xác nhận đã được gửi lại thành công",
        NotifyTypeEnum.SUCCESS
      );
      // countdown 30s
      setResendDisabled(true);
      setTimer(30);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    onError: (error: any) => {
      notify(
        error?.message || "Không thể gửi lại mã xác nhận",
        NotifyTypeEnum.ERROR
      );
    },
  });

  const handleResend = () => {
    resendMailMutation.mutate(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác nhận Email</Text>
      <Text style={styles.subtitle}>
        Nhập mã xác nhận đã được gửi tới email của bạn
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="Nhập mã xác nhận"
          placeholderTextColor="#999"
          value={code}
          onChangeText={setCode}
        />
        <Pressable
          disabled={resendDisabled}
          onPress={handleResend}
          style={[styles.resendBtn, resendDisabled && { opacity: 0.5 }]}
        >
          <Text style={styles.resendText}>
            {resendDisabled ? `Gửi lại (${timer}s)` : "Gửi lại"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        disabled={verifyRegisterMutation.isPending}
        style={styles.submitButton}
        onPress={handleVerify}
      >
        <Text style={styles.primaryText}>Xác nhận</Text>
      </Pressable>
    </View>
  );
};

export default VerifyCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E10",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    marginTop: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6C63FF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E22",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 55,
    width: "100%",
    marginBottom: 30,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  resendBtn: {
    marginLeft: 10,
  },
  resendText: {
    color: "#6C63FF",
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    marginTop: 8,
    width: 250,
  },
  primaryText: {
    color: "black",
    fontSize: FontSizes.medium,
    fontFamily: Fonts.medium,
  },
});
