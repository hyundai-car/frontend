import { useMutation } from "@tanstack/react-query";
import { paymentsDeposit } from "./payments.api";

export const usePaymentDepositMutation = () => {
  return useMutation({
    mutationFn: (carId: number) => paymentsDeposit(carId),
  });
};
