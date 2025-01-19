import { useMutation } from "@tanstack/react-query";
import { paymentsBalance, paymentsDeposit } from "./payments.api";

export const usePaymentDepositMutation = () => {
  return useMutation({
    mutationFn: (carId: number) => paymentsDeposit(carId),
  });
};
export const usePaymentBalanceMutation = () => {
  return useMutation({
    mutationFn: (carId: number) => paymentsBalance(carId),
  });
};
