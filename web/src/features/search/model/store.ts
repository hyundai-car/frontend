// features/search/model/store.ts
import { create } from "zustand";
import type { FilterState } from "./types";
import { INITIAL_FILTERS } from "./constants";

type SearchStore = {
  keyword: string;
  isFilterOpen: boolean;
  filters: FilterState;
  setKeyword: (keyword: string) => void;
  setFilters: (filters: FilterState) => void;
  setFilterOpen: (isOpen: boolean) => void;
  printSearchConditions: () => void;
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  keyword: "",
  isFilterOpen: false,
  filters: INITIAL_FILTERS,
  setKeyword: (keyword) => set({ keyword }),
  setFilters: (filters) => set({ filters }),
  setFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),
  printSearchConditions: () => {
    const { keyword, filters } = get();
    console.log("=== 검색 조건 ===");
    if (keyword) {
      console.log("검색어:", keyword);
    }
    if (filters.fuel.length > 0) {
      console.log("연료:", filters.fuel.join(", "));
    }
    if (filters.bodyType.length > 0) {
      console.log("차종:", filters.bodyType.join(", "));
    }
    console.log(
      "가격:",
      `${filters.priceRange[0].toLocaleString()}만원 - ${filters.priceRange[1].toLocaleString()}만원`
    );
    console.log(
      "주행거리:",
      `${filters.mileageRange[0].toLocaleString()}km - ${filters.mileageRange[1].toLocaleString()}km`
    );
    console.log(
      "연식:",
      `${filters.yearRange[0]}년 - ${filters.yearRange[1]}년`
    );
    console.log("========================");
  },
}));
