import type { TSearchResponse } from "@/entities/search/model/search.types";
import { authenticated } from "@/shared/lib/axios/axiosInstance";

interface SearchParams {
  page?: number;
  limit?: number;
}

export const fetchCarList = async (
  params: SearchParams = {}
): Promise<TSearchResponse> => {
  console.log("Fetching cars with params:", params);

  try {
    const { data } = await authenticated.get("/cars", {
      params: {
        page: params.page || 0,
        limit: params.limit || 20,
      },
    });

    console.log("API Response data:", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
