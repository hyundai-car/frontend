/**
 * //TODO 삭제예정
 */

import { getBestCarApi } from "@/entities/recommendation/api/recommendation.api";
import { useQuery } from "@tanstack/react-query";
import { BestCarResponse } from "@/entities/recommendation/api/types";

// TODO
export const useBestCarQuery = () => {
  return useQuery<BestCarResponse>(
    {
      queryKey: ["bestCar"],
      queryFn: () => getBestCarApi(),
      // suspense: true,
    }
    // as UseQueryOptions<BestCarResponse>
  );
};
