import { RegisterFromData } from "@/schema/RegisterSchema";
import axiosInstance from "@/services/axiosInstance";
import { VerifyRegisterPayload } from "@/types/register";

export async function registerData(payload: RegisterFromData) {
  const response = await axiosInstance.post("/auth/register/start", payload);
  return response;
}

export async function verifyRegister(payload: VerifyRegisterPayload) {
  const response = await axiosInstance.post("/auth/register/verify", payload);
  return response;
}

export async function resendMail(email: string) {
  const payload = {
    email,
    type: "REGISTER"
  }
  const response = await axiosInstance.post("/auth/otp/resend", payload);
  return response;
}