import { BestCarResponse } from "@/pages/recommendation/api/types";
import { MOCK_BestCarData } from "@/pages/recommendation/model/mock";

// TODO 임시 fetch 함수

export const getBestCar = async (): Promise<BestCarResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_BestCarData;
};
