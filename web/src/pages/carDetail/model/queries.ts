import { getCarDetailApi } from "@/pages/carDetail/api/carDetail.api";
import { useQuery } from "@tanstack/react-query";
import { CarDetailResponse } from "@/shared/api/api.types";
import { getCar360ImagesApi } from "@/entities/carDetail/api/Car360Image.api";
import { getCarDetailImgApi } from "@/pages/carDetail/api/carDetailImg.api";
import { CarDetailImgResponse } from "@/pages/carDetail/api/types";

//TODO
export const useCarDetailQuery = (carNo: number) => {
  return useQuery<CarDetailResponse>({
    queryKey: ["carDetail", carNo],
    queryFn: () => getCarDetailApi(carNo),
    enabled: !!carNo, // carId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    retry: 1,
    refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 방지
  });
};

export const useCar360ImagesQuery = (carNo: number) => {
  return useQuery<string[]>({
    queryKey: ["360Images", carNo],
    queryFn: () => getCar360ImagesApi(carNo),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
    retry: 1,
    refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 방지
    enabled: !!carNo, // carNo가 유효할 때만 실행
  });
};

export const useGetImgListQuery = (carNo: number) => {
  return useQuery<CarDetailImgResponse>({
    queryKey: ["carDetailImg", carNo],
    queryFn: () => getCarDetailImgApi(carNo),
  });
};
