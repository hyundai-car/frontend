import { SearchParams } from "@/entities/search/model/search.types";
import { FilterState } from "@/features/search/model/types";

const FUEL_TYPE_MAPPING = {
  가솔린: "gasoline",
  디젤: "diesel",
  하이브리드: "hybrid",
  전기: "electric",
} as const;

const BODY_TYPE_MAPPING = {
  중형: "passenger",
  대형: "luxury",
  SUV: "suv",
  VAN: "van",
} as const;

export const convertFiltersToParams = (
  keyword: string,
  { fuel, bodyType, priceRange, mileageRange, yearRange }: FilterState
): SearchParams => {
  const params: SearchParams = {};

  if (keyword.trim()) {
    params.keyword = keyword;
  }
  if (fuel.length > 0) {
    params.fuelType = fuel.map((f) => FUEL_TYPE_MAPPING[f]).join(",");
  }
  if (bodyType.length > 0) {
    params.bodyType = bodyType.map((b) => BODY_TYPE_MAPPING[b]).join(",");
  }
  if (priceRange[0] > 0) {
    params.minSellingPrice = priceRange[0];
  }
  if (priceRange[1] < 10000) {
    params.maxSellingPrice = priceRange[1];
  }
  if (mileageRange[0] > 0) {
    params.minMileage = mileageRange[0];
  }
  if (mileageRange[1] < 200000) {
    params.maxMileage = mileageRange[1];
  }
  if (yearRange[0] > 2010) {
    params.minYear = yearRange[0];
  }
  if (yearRange[1] < 2024) {
    params.maxYear = yearRange[1];
  }

  return params;
};
