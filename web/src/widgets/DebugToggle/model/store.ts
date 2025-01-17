import { create } from "zustand";

type DebugState = {
  isEnabled: boolean;
  toggleDebug: () => void;
};

export const useDebugStore = create<DebugState>((set) => ({
  isEnabled: false,
  toggleDebug: () => set((state) => ({ isEnabled: !state.isEnabled })),
}));
