import { create } from "zustand";
import type { FilterState } from "./types";
import { INITIAL_FILTERS } from "./constants";

type SearchStore = {
  isFilterOpen: boolean;
  filters: FilterState;
  setFilterOpen: (isOpen: boolean) => void;
  setFilters: (filters: FilterState) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  isFilterOpen: false,
  filters: INITIAL_FILTERS,
  setFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),
  setFilters: (filters) => set({ filters }),
}));
