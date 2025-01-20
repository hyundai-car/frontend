// feature/search/model/types.ts
import { Control } from "react-hook-form";
import { FUEL_TYPES, CAR_TYPES } from "./constants";

// 기본 타입 정의
export type FuelType = (typeof FUEL_TYPES)[number];
export type CarType = (typeof CAR_TYPES)[number];
export type Range = [number, number];

// 필터 상태 타입
export interface FilterState {
  fuel: FuelType[];
  carType: CarType[];
  priceRange: Range; // 단위: 만원
  mileageRange: Range; // 단위: km
  yearRange: Range; // 단위: 년도
}

// 필터 섹션 Props 타입
export interface BaseFilterSectionProps {
  title: string;
  control: Control<FilterState>;
}

export interface SelectSectionProps extends BaseFilterSectionProps {
  name: keyof Pick<FilterState, "fuel" | "carType">;
  options: readonly string[];
}

export interface RangeSectionProps extends BaseFilterSectionProps {
  name: keyof Pick<FilterState, "priceRange" | "mileageRange" | "yearRange">;
  min: number;
  max: number;
  step: number;
  formatValue: (value: number) => string;
}

// UI 컴포넌트 Props 타입
export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export interface SearchBoxProps {
  onFilterClick: () => void;
}

export interface SearchState extends FilterState {
  keyword: string;
}
