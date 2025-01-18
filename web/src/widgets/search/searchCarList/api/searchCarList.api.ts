import type { TSearch } from "@/entities/search/model/search.types";
import { FilterState } from "@/features/search/model/types";
import { authenticated } from "@/shared/lib/axios/axiosInstance";
import { convertFiltersToParams } from "../lib/converter";

export const fetchCarList = async (
  keyword: string,
  filters: FilterState,
  page: number = 0
): Promise<{
  contents: TSearch[];
  isLast: boolean;
  pageNumber: number;
}> => {
  const params = {
    ...convertFiltersToParams(keyword, filters),
    page,
    size: 10,
  };
  console.log("API Request Params:", params);

  const { data } = await authenticated.get<{
    contents: TSearch[];
    totalPages: number;
  }>("/cars", {
    params,
  });

  return {
    contents: data.contents,
    isLast: page + 1 >= data.totalPages,
    pageNumber: page,
  };
};
