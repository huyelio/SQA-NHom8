import { axiosInstanceAgent } from "@/services/axiosInstance";

export async function sendChat(message: string) {
  const payload = {
    message,
  };
  const response = await axiosInstanceAgent.post("/agent/chat", payload);
  return response.data;
}
