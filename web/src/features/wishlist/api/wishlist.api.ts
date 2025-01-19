import { authenticated } from "@/shared/lib/axios/axiosInstance";

// export type TWishlistResponse = {
//   contents: number[];
//   totalCount: number;
// };

export const toggleCarWishlist = async (carId: number) => {
  const { data } = await authenticated.post<{ success: boolean }>(
    `/likes/${carId}`
  );
  return data;
};
