import { axiosInstanceCalori } from "./../../axiosInstance";

export async function postDetectFoodPic(imageUri: string) {
  const formData = new FormData();
  formData.append("image", {
    uri: imageUri,
    type: "image/jpeg",
    name: "upload.jpg",
  } as any);
  const response = await axiosInstanceCalori.post("/detect", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export async function postAddFood(payload: any) {
  const response = await axiosInstanceCalori.post(
    "/calories/food-records",
    payload
  );
  return response;
}

export async function getWeightHistory() {
  const response = await axiosInstanceCalori.get(
    "/user-profile/weight-history"
  );
  return response.data;
}

export async function getFoodInByDate(date: string) {
  const response = await axiosInstanceCalori.get("/calories/food-records", {
    params: {
      log_date: date,
    },
  });
  return response.data;
}

export async function postStep(steps: number) {
  const payload = {
    steps,
  };
  const response = await axiosInstanceCalori.post("/daily-logs/steps", payload);
}

export async function deleteFoodRecord(id: number) {
  const response = await axiosInstanceCalori.delete(
    `/calories/food-records/${id}`
  );
  return response
}