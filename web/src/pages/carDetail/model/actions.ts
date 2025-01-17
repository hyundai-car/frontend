import { useCarDetailStore } from "@/pages/carDetail/model/store";
import { CarDetailResponse } from "@/shared/api/api.types";
import { useEffect } from "react";

export const SaveCarDetailStore = (
  data: CarDetailResponse | undefined,
  carId: number
) => {
  const { setCarId, setCarGraphData, setCarBasicData, setCarOptionData } =
    useCarDetailStore();

  useEffect(() => {
    if (!data) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { optionListId, createdAt, updatedAt, ...optionData } =
      data.optionLists;

    setCarId(carId);
    setCarGraphData({
      mmScore: data.cars.mmScore,
      initialRegistration: data.cars.initialRegistration,
      fuelEfficiency: data.cars.fuelEfficiency,
      mileage: data.cars.mileage,
      accidentCount: data.accidentCount,
    });
    setCarBasicData({
      mmScore: data.cars.mmScore,
      initialRegistration: data.cars.initialRegistration,
      fuelEfficiency: data.cars.fuelEfficiency,
      mileage: data.cars.mileage,
      accidentCount: data.accidentCount,
      carNumber: data.cars.carNumber,
      exteriorColor: data.cars.exteriorColor,
      fuelType: data.cars.fuelType,
      seating: data.cars.seating,
    });

    setCarOptionData(optionData);
  }, [
    data,
    carId,
    setCarId,
    setCarGraphData,
    setCarBasicData,
    setCarOptionData,
  ]);
};
