import { BestCar, ComparisonAvg } from "@/entities/recommendation/api/types";
import { Comparison } from "@/shared/model/car.types";

export const compareWithAvg = (
  bestCar: BestCar,
  comparisions: ComparisonAvg
): Record<keyof Comparison, boolean> => {
  return {
    accidentCount: bestCar.accidentCount > comparisions.accidentCountAvg,
    mmScore: bestCar.mmScore > comparisions.mmScoreAvg,
    initialRegistration:
      bestCar.initialRegistration > comparisions.initialRegistrationAvg,
    mileage: bestCar.mileage > comparisions.mileageAvg,
    fuelEfficiency: bestCar.fuelEfficiency > comparisions.fuelEfficiencyAvg,
  };
};
