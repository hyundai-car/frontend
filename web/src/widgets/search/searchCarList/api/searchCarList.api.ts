import type {
  SearchParams,
  TSearch,
  TSearchResponse,
} from "@/entities/search/model/search.types";
import { FilterState } from "@/features/search/model/types";
import { authenticated } from "@/shared/lib/axios/axiosInstance";
const convertFiltersToParams = (
  keyword: string,
  filters: FilterState
): SearchParams => {
  const params: SearchParams = {
    page: 0,
    size: 20,
  };

  if (keyword.trim()) {
    params.keyword = keyword;
  }

  if (filters.fuel.length > 0) {
    params.fuelType = filters.fuel.join(",");
  }

  if (filters.bodyType.length > 0) {
    params.bodyType = filters.bodyType.join(",");
  }

  params.minSellingPrice = filters.priceRange[0];
  params.maxSellingPrice = filters.priceRange[1];
  params.minMileage = filters.mileageRange[0];
  params.maxMileage = filters.mileageRange[1];
  params.minYear = filters.yearRange[0];
  params.maxYear = filters.yearRange[1];

  return params;
};

// export const fetchCarList = async (
//   params: SearchParams = {}
// ): Promise<TSearchResponse> => {
//   console.log("Fetching cars with params:", params);

//   try {
//     const { data } = await authenticated.get("/cars", {
//       params: {
//         // page: params.page || 0,
//         // limit: params.limit || 20,
//       },
//     });

//     console.log("API Response data:", data);
//     return data;
//   } catch (error) {
//     console.error("API Error:", error);
//     throw error;
//   }
// };

export const fetchCarList = async (
  keyword: string,
  filters: FilterState
): Promise<{ contents: TSearch[] }> => {
  const params = convertFiltersToParams(keyword, filters);
  console.log("API Request Params:", params);

  const { data } = await authenticated.get<{ contents: TSearch[] }>("/cars", {
    params,
  });

  return data;
};
