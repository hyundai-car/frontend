import { getBestCar } from "@/pages/recommendation/api/recommendation.api";
import { useQuery } from "@tanstack/react-query";
import { BestCarResponse } from "@/pages/recommendation/api/\btypes";
// TODO
export const useBestCar = () => {
  return useQuery<BestCarResponse>({
    queryKey: ["bestCar"],
    queryFn: () => getBestCar(),
    suspense: true,
  });
};
