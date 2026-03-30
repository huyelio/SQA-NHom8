import { axiosInstanceCalori } from "@/services/axiosInstance";
import { getCurrentWeekRange } from "@/utils/getCurrentWeekRange";
import dayjs from "dayjs";

export async function getProfile() {
  const response = await axiosInstanceCalori.get("/user-profile");
  return response.data;
}

export async function updateProfile(payload: any) {
  const response = await axiosInstanceCalori.put("/user-profile", payload);
  return response.data;
}

export async function getTargetInfor() {
  // const { start_date, end_date } = getCurrentWeekRange();
  const end_date = dayjs().format("YYYY-MM-DD");
  const start_date = dayjs().subtract(7, "day").format("YYYY-MM-DD");
  const response = await axiosInstanceCalori.get("/daily-logs", {
    params: {
      start_date,
      end_date,
    },
  });
  return response.data;
}

export async function getStepToDayInfor() {
  const end_date = dayjs().format("YYYY-MM-DD");
  const start_date = dayjs().format("YYYY-MM-DD");
  const response = await axiosInstanceCalori.get("/daily-logs", {
    params: {
      start_date,
      end_date,
    },
  });
  return response.data;
}
