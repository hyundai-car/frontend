import { CarDetailResponse } from "@/shared/api/api.types";
import { getCarDetailApi } from "@/widgets/recommendation/api/carDetail.api";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useCarDetailQuery = (carNo: number) => {
  return useQuery<CarDetailResponse>({
    queryKey: ["carDetail", carNo],
    queryFn: () => getCarDetailApi(carNo),
    enabled: !!carNo, // carId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    retry: 1,
    // refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 방지
  });
};

export const useCarDetailsQueries = (carIds: number[] = []) => {
  return useQueries({
    queries: carIds.map((carId) => ({
      queryKey: ["carDetail", carId],
      queryFn: () => getCarDetailApi(carId),
      enabled: !!carId,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 1,
    })),
  });
};
