import { BestCar, ComparisonAvg } from "@/entities/recommendation/api/types";
import { Comparison } from "@/shared/model/car.types";
import { useNavigate } from "react-router-dom";

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

/**
 * @description 로컬스토리지에서 추천결과 response 받아오기
 */
export const useRecommendationResult = () => {
  const navigate = useNavigate();

  try {
    const savedData = localStorage.getItem("recommendationResult");
    const resultData = savedData ? JSON.parse(savedData) : null;

    if (
      !resultData?.bestCar ||
      !resultData?.comparisons ||
      !resultData?.graph ||
      !resultData?.otherCarIds
    ) {
      navigate("/recommendation/candidates");
      // return null;
      throw new Error("Invalid data");
    }

    // return resultData;
    return {
      bestCar: resultData.bestCar,
      comparisons: resultData.comparisons,
      graph: resultData.graph,
      otherCarIds: resultData.otherCarIds,
    };
  } catch {
    navigate("/recommendation/candidates");
    // return null;
    throw new Error("Invalid data");
  }
};
