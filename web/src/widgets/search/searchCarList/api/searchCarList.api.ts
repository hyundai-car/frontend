import type {
  TSearch,
  TSearchResponse,
} from "@/entities/search/model/search.types";
import { FilterState } from "@/features/search/model/types";
import { authenticated } from "@/shared/lib/axios/axiosInstance";
import { convertFiltersToParams } from "../lib/converter";

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
