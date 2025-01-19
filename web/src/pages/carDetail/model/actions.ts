import { useCarDetailStore } from "@/pages/carDetail/model/store";
import { CarDetailResponse } from "@/shared/api/api.types";
import { useEffect } from "react";

export const useSaveCarDetailStore = (
  data: CarDetailResponse | undefined,
  carId: number
) => {
  const { setCarId, setCarGraphData, setCarBasicData, setCarOptionData } =
    useCarDetailStore();

  useEffect(() => {
    if (!data) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { optionListId, createdAt, updatedAt, ...optionData } =
      data.car.optionLists;

    setCarId(carId);
    console.log("asd", data.car.graph);
    setCarGraphData({
      mmScoreNorm: data.car.mmScore,
      initialRegistrationNorm: data.car.graph.initialRegistrationNorm,
      fuelEfficiencyNorm: data.car.graph.fuelEfficiencyNorm,
      mileageNorm: data.car.graph.mileageNorm,
      accidentCountNorm: data.car.graph.accidentCountNorm,
    });
    setCarBasicData({
      mmScore: data.car.mmScore,
      initialRegistration: data.car.initialRegistration,
      fuelEfficiency: data.car.fuelEfficiency,
      mileage: data.car.mileage,
      accidentCount: data.car.accidentCount,
      carNumber: data.car.carNumber,
      exteriorColor: data.car.exteriorColor,
      fuelType: data.car.fuelType,
      seating: data.car.seating,
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
