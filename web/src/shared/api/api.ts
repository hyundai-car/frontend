import { authenticated } from "@/shared/lib/axios/axiosInstance";

export const getHeartApi = async (carNo: number) => {
  const response = await authenticated.get(`/likes/${carNo}`);
  return response.data;
};
export const postHeartApi = async (carNo: number) => {
  const response = await authenticated.post(`/likes/${carNo}`, {
    carId: carNo,
  });

  return response.data;
};
