import { axiosInstanceAgent } from "@/services/axiosInstance";

export async function getWorkoutPlan() {
  const response = await axiosInstanceAgent.get("/agent/workout-plan");
  return response.data;
}

export async function createWorkoutPlan() {
  const response = await axiosInstanceAgent.post("/agent/workout-plan");
  return response.data;
}
