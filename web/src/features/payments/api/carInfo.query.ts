import { getCarDetailApi } from "@/pages/carDetail/api/carDetail.api";
import { useQuery } from "@tanstack/react-query";

export const usePaymentsCarInfoQuery = (carId: number) => {
  return useQuery({
    queryKey: ["carDetail", carId],
    queryFn: () => getCarDetailApi(carId),
    select: (data) => {
      const car = data?.car || {};
      return {
        carId: car.carId ?? "",
        carName: car.carName ?? "",
        initialRegistration: car.initialRegistration ?? "",
        mileage: car.mileage ?? 0,
        sellingPrice: car.sellingPrice ?? 0,
        mainImage: car.mainImage ?? "",
      };
    },
    enabled: !!carId,
    staleTime: 5 * 60 * 1000,
  });
};
