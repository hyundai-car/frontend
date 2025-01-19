import { create } from "zustand";

interface PaymentStore {
  price: number;
  setPrice: (price: number) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  price: 0, // 초기값
  setPrice: (price) => set({ price }),
}));
