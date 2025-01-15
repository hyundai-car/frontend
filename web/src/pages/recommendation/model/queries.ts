import { getBestCar } from "@/pages/recommendation/api/recommendation.api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BestCarResponse } from "@/pages/recommendation/api/types";
// TODO
export const useBestCar = () => {
  return useQuery<BestCarResponse>({
    queryKey: ["bestCar"],
    queryFn: () => getBestCar(),
    suspense: true,
  } as UseQueryOptions<BestCarResponse>);
};
