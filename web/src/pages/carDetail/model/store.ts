import { Normalization } from "@/shared/api/api.types";
import { Basic, Option } from "@/shared/model/car.types";
import { create } from "zustand";

interface CarDetailStore {
  carId: number | undefined;

  carGraphData: Normalization | undefined;
  carBasicData: Basic | undefined;
  carOptionData: Option | undefined;

  setCarId: (id: number) => void;
  setCarGraphData: (carGraphData: Normalization) => void;
  setCarBasicData: (carBasicData: Basic) => void;
  setCarOptionData: (carOptionData: Option) => void;
}

export const useCarDetailStore = create<CarDetailStore>((set) => ({
  carId: undefined,
  carGraphData: undefined,
  carBasicData: undefined,
  carOptionData: undefined,

  setCarId: (carId) => set({ carId }),
  setCarGraphData: (carGraphData) => set({ carGraphData }),
  setCarBasicData: (carBasicData) => set({ carBasicData }),
  setCarOptionData: (carOptionData) => set({ carOptionData }),
}));
