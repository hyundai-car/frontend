import { BestCarResponse } from "@/entities/recommendation/api/types";
import { MOCK_BestCarData } from "@/entities/recommendation/model/mock";

// TODO 임시 fetch 함수

export const getBestCarApi = async (): Promise<BestCarResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_BestCarData;
};
