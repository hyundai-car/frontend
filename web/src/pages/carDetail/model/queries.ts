import { getCarDetailApi } from "@/pages/carDetail/api/carDetail.api";
import { useQuery } from "@tanstack/react-query";
import { CarDetailResponse } from "@/shared/api/api.types";

//TODO
export const useCarDetailQuery = (carNo: number) => {
  return useQuery<CarDetailResponse>({
    queryKey: ["carDetail"],
    queryFn: () => getCarDetailApi(carNo),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    retry: 1,
    refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 방지
  });
};
