import { axiosInstanceAgent } from "@/services/axiosInstance";

export async function getMealPlan() {
  const response = await axiosInstanceAgent.get("/agent/meal-plan");
  return response.data;
}

export async function createMealPlan() {
  const response = await axiosInstanceAgent.post("/agent/meal-plan");
  return response.data;
}
