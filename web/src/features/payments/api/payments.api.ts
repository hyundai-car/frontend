import { authenticated } from "@/shared/lib/axios/axiosInstance";

export const paymentsDeposit = async (carId: number) => {
  const { data } = await authenticated.put<{ success: boolean }>(
    `/orders/${carId}/contract`
  );
  return data;
};
export const paymentsBalance = async (carId: number) => {
  const { data } = await authenticated.put<{ success: boolean }>(
    `/orders/${carId}/pay`
  );
  return data;
};
