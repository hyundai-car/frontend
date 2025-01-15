import {
  BestCar,
  Comparison,
  ComparisonAvg,
} from "@/widgets/recommendation/model/types";

export const compareWithAvg = (
  bestCar: BestCar,
  comparisions: ComparisonAvg
): Record<keyof Comparison, boolean> => {
  return {
    accidentCount: bestCar.accidentCount > comparisions.accidentCountAvg,
    mmScore: bestCar.mmScore > comparisions.mmScoreAvg,
    initialRegistrationDate:
      bestCar.initialRegistrationDate > comparisions.initialRegistrationDateAvg,
    mileage: bestCar.mileage > comparisions.mileageAvg,
    fuelEfficiency: bestCar.fuelEfficiency > comparisions.fuelEfficiencyAvg,
  };
};
