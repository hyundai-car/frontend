import { authenticated } from "@/shared/lib/axios/axiosInstance";

export const getLikeListApi = async () => {
  const pageable = {
    page: 0,
    size: 10,
    sort: "updatedAt",
  };

  const response = await authenticated.get("/likes", {
    params: pageable,
  });
  return response.data;
};
