import { getCarDetailApi } from "@/pages/carDetail/api/carDetail.api";
import { CarData } from "@/shared/model/car.types";
import { useQuery } from "@tanstack/react-query";

//TODO
export const useCarDetailQuery = () => {
  return useQuery<CarData>({
    queryKey: ["carDetail"],
    queryFn: () => getCarDetailApi(),
  });
};
