// import { MOCK_CarDetail } from "@/pages/carDetail/model/mock";
import { authenticated } from "@/shared/lib/axios/axiosInstance";

export const getCarDetailApi = async (carNo: number) => {
  const response = await authenticated.get(`/cars/${carNo}`);
  return response.data;
  // return MOCK_CarDetail;
};
