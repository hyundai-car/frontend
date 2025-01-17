import { create } from "zustand";

interface CarDetailStore {
  carId: number | undefined;
  setCarId: (id: number) => void;
}

export const useCarDetailStore = create<CarDetailStore>((set) => ({
  carId: undefined,
  setCarId: (carId: number) => set({ carId: carId }),
}));
