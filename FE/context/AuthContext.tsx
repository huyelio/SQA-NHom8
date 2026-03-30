import { STORAGE_KEY } from "@/constants/common";
import { NotifyTypeEnum } from "@/constants/notify";
import { LoginFormData } from "@/schema/loginSchema";
import { postLogin } from "@/services/api/auth/login";
import axiosInstance from "@/services/axiosInstance";
import { notify } from "@/utils/notify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (payload: LoginFormData) => void;
  // loginWithGoogle: (idToken: string) => Promise<void>;
  loginLoading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // -------- Load auth state --------
  useEffect(() => {
    const loadAuthState = async () => {
      const accessToken = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
      setIsLoggedIn(!!accessToken);
      setIsLoading(false);
    };
    loadAuthState();
  }, []);

  // -------- Login email/password --------
  const loginMutation = useMutation({
    mutationFn: (payload: LoginFormData) => postLogin(payload),
    onSuccess: async (res: any, payload) => {
      await AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, res.accessToken);
      await AsyncStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, res.refreshToken);
      await AsyncStorage.setItem(
        STORAGE_KEY.SAVED_LOGIN,
        JSON.stringify({
          username: payload.email,
          password: payload.password,
        })
      );
      setIsLoggedIn(true);
      notify("Đăng nhập thành công", NotifyTypeEnum.SUCCESS);
      router.replace("/(tabs)/activites");
    },
    onError: (error: any) => {
      notify(
        error.response?.data?.message || "Đăng nhập thất bại",
        NotifyTypeEnum.ERROR
      );
    },
  });

  const login = (payload: LoginFormData) => {
    loginMutation.mutate(payload);
  };

  // -------- Login Google --------
  // const loginWithGoogle = async (idToken: string) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axiosInstance.post("/auth/google", { idToken });

  //     await AsyncStorage.setItem(
  //       STORAGE_KEY.ACCESS_TOKEN,
  //       res.data.accessToken
  //     );
  //     await AsyncStorage.setItem(
  //       STORAGE_KEY.REFRESH_TOKEN,
  //       res.data.refreshToken
  //     );

  //     setIsLoggedIn(true);
  //     notify("Đăng nhập Google thành công", NotifyTypeEnum.SUCCESS);
  //     router.replace("/(tabs)/activites");
  //   } catch (error: any) {
  //     notify(
  //       error.response?.data?.message || "Đăng nhập Google thất bại",
  //       NotifyTypeEnum.ERROR
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // -------- Logout --------
  const logout = async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEY.ACCESS_TOKEN,
      STORAGE_KEY.REFRESH_TOKEN,
      STORAGE_KEY.SAVED_LOGIN,
    ]);
    setIsLoggedIn(false);
    notify("Đăng xuất thành công", NotifyTypeEnum.SUCCESS);
    router.replace("/(screen)/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        login,
        // loginWithGoogle,
        loginLoading: loginMutation.isPending,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
