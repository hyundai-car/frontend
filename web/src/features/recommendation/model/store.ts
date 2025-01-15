import { create } from "zustand";

interface RecommendationStore {
  hasCheckedItems: boolean;
  setHasCheckedItems: (has: boolean) => void;
}

export const useRecommendationStore = create<RecommendationStore>((set) => ({
  hasCheckedItems: false,
  setHasCheckedItems: (has: boolean) => set({ hasCheckedItems: has }),
}));
