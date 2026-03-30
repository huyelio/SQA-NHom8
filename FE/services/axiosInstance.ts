import { STORAGE_KEY } from "@/constants/common";
import { getToken } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosInstance } from "axios";
import Constants from "expo-constants";
const { FACE, AUTH, FOOD, API_GETWAY, AGENT } = Constants.expoConfig?.extra as {
  FACE: string;
  AUTH: string;
  FOOD: string;
  API_GETWAY: string;
  AGENT: string;
};

export async function postRefresh(refreshToken: string) {
  const res = await axios.post(`${API_GETWAY}/api/auth/refresh`, {
    refreshToken,
  });

  return res.data; // { accessToken, refreshToken }
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = await AsyncStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const data = await postRefresh(refreshToken);

  await AsyncStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.accessToken);

  await AsyncStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);

  return data.accessToken;
}

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 300000, // 5 minutes timeout for AI processing
    headers: {
      "Content-Type": "application/json",
    },
  });

  let isRefreshing = false;
  let failedQueue: {
    resolve: (token: string) => void;
    reject: (err: any) => void;
  }[] = [];

  const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((p) => {
      if (error) p.reject(error);
      else p.resolve(token!);
    });
    failedQueue = [];
  };

  instance.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("🚀 ~ request:", JSON.stringify(config, null, 2));
      return config;
    },
    (error: AxiosError) => {
      console.log("🚀 ~ request error:", JSON.stringify(error, null, 2));
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log("✅ ~ response:", JSON.stringify(response.data, null, 2));
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;
      console.log(
        "❌ ~ response error:",
        JSON.stringify(error.message, null, 2)
      );

      if (status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          console.log("...Token is refreshing...");
          // cứu các request khác ko cần gọi lại refesh
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(instance(originalRequest));
              },
              reject,
            });
          });
        }
        // add thêm vào obj config của request
        originalRequest._retry = true;
        //flag
        isRefreshing = true;
        console.log("...Refreshing token...");

        try {
          const newToken = await refreshAccessToken();
          console.log("...Token refreshed successfully...");

          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (err) {
          console.log("...Token refresh failed...", err);
          processQueue(err, null);

          await AsyncStorage.multiRemove([
            STORAGE_KEY.ACCESS_TOKEN,
            STORAGE_KEY.REFRESH_TOKEN,
          ]);

          // router.replace("/(screen)/login");
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

console.log("🚀 ~ PUBLIC_URL:", API_GETWAY);

// const axiosInstance = createAxiosInstance(`${API_GETWAY}/api`);
const axiosInstance = createAxiosInstance(`${AUTH}/api`);
export const axiosInstanceAI = createAxiosInstance(`${FACE}/api/v1/`);
export const axiosInstanceCalori = createAxiosInstance(`${FOOD}/api/v2`);
export const axiosInstanceAgent = createAxiosInstance(`${AGENT}/api/v3`);
export default axiosInstance;
