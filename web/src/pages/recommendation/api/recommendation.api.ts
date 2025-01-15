import { MOCK_BestCarData } from "@/pages/recommendation/model/mock";
import { BestCarResponse } from "@/pages/recommendation/api/\btypes";

// TODO 임시 fetch 함수

export const getBestCar = async (): Promise<BestCarResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_BestCarData;
};
