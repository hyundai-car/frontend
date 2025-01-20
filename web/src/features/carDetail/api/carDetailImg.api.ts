import { authenticated } from "@/shared/lib/axios/axiosInstance";

export const getCarDetailImgApi = async (carNo: number) => {
  const response = await authenticated.get(`/cars/${carNo}/detailimages`);
  return response.data;
};
