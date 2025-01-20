import { getCarDetailImgApi } from "@/features/carDetail/api/carDetailImg.api";
import { CarDetailImgResponse } from "@/features/carDetail/api/types";
import { useQuery } from "@tanstack/react-query";

export const useGetImgListQuery = (carNo: number) => {
  return useQuery<CarDetailImgResponse>({
    queryKey: ["carDetailImg", carNo],
    queryFn: () => getCarDetailImgApi(carNo),
  });
};
