import { LoginFormData } from "@/schema/loginSchema";
import axiosInstance from "@/services/axiosInstance";

export async function postLogin(payload: LoginFormData) {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
}
