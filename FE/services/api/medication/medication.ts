import axiosInstance from "@/services/axiosInstance";

export async function postSingleDrug(payload: any) {
  const response = await axiosInstance.post(
    "/prescriptions/single-drug",
    payload
  );
  return response;
}

//get list drug

export async function getListDrug(page: number, keyword: string) {
  const response = await axiosInstance.get("/drugs", {
    params: {
      page,
      q: keyword,
    },
  });
  return response.data;
}

export async function getDrugById(id: number) {
  const response = await axiosInstance.get(`/drugs/${id}`);
  return response.data;
}

//get list prescriptions

export async function getListPrescriptions(date: string) {
  const response = await axiosInstance.get("/prescriptions/schedules", {
    params: {
      date,
    },
  });
  return response.data;
}

export async function getListNoti() {
  const response = await axiosInstance.get(
    "prescriptions/single-drug/status/1"
  );
  return response.data;
}

export async function updateStatus(id: number, status: number) {
  const payload = {
    scheduleId: id,
    status,
  };
  const response = await axiosInstance.put(
    `/prescriptions/schedules/status`,
    payload
  );
  return response.data;
}

export async function deleteScheduleById(id: number) {
  const response = await axiosInstance.delete(`/prescriptions/drugs/${id}`);
  return response.data;
}

export async function getSingleDrugById(id: number) {
  const response = await axiosInstance.get(`/prescriptions/single-drug/${id}`);
  return response.data;
}

export async function updateSingleDrug(id: number, payload: any) {
  const response = await axiosInstance.put(
    `/prescriptions/drugs/${id}`,
    payload
  );
  return response.data;
}

export async function getHistory(filter: "month", month: number, year: number) {
  const response = await axiosInstance.get(`/prescriptions/schedules/history`, {
    params: { filter, month, year },
  });

  return response.data;
}
