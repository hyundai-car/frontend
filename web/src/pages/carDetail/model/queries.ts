import { getCarDetailApi } from "@/pages/carDetail/api/carDetail.api";
import { CarData } from "@/shared/model/car.types";
import { useQuery } from "@tanstack/react-query";

//TODO
export const useCarDetailQuery = (carNo: number) => {
  return useQuery<CarData>({
    queryKey: ["carDetail"],
    queryFn: () => getCarDetailApi(carNo),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    retry: 1,
    refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 방지
  });
};
