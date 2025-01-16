import { create } from "zustand";

interface PaymentFormState {
  cardCompany: string | null;
  cardNumber: string;
  expiryDate: string;
  isValid: boolean;
  setCardCompany: (company: string | null) => void;
  setCardNumber: (number: string) => void;
  setExpiryDate: (date: string) => void;
  setIsValid: (valid: boolean) => void;
  reset: () => void;
}

export const usePaymentFormStore = create<PaymentFormState>((set) => ({
  cardCompany: null,
  cardNumber: "",
  expiryDate: "",
  isValid: false,
  setCardCompany: (company) => set({ cardCompany: company }),
  setCardNumber: (number) => set({ cardNumber: number }),
  setExpiryDate: (date) => set({ expiryDate: date }),
  setIsValid: (valid) => set({ isValid: valid }),
  reset: () =>
    set({
      cardCompany: null,
      cardNumber: "",
      expiryDate: "",
      isValid: false,
    }),
}));
