import { TSimpleSearchAnswers } from "@/entities/simpleSearch/model/types";
import { authenticated } from "@/shared/lib/axios/axiosInstance";
// interface SimpleSearchRequest {
//   budget: string;
//   usage: string;
//   maintenance: string;
//   experience: string;
//   preferredType: string;
// }
interface RecommendCar {
  recommendId: number;
  recommendedAt: string;
  recommendPriority: number;
  recommendCondition: string;
  recommendReason: string;
  createdAt: string;
  updatedAt: string;
  car: TSimpleSearchAnswers;
}

interface SimpleSearchResponse {
  contents: RecommendCar[];
}

export const fetchSimpleSearchResult = async (
  answers: TSimpleSearchAnswers
): Promise<SimpleSearchResponse> => {
  const request = {
    budget: (answers[0] + 1).toString(),
    usage: (answers[1] + 1).toString(),
    maintenance: (answers[2] + 1).toString(),
    experience: (answers[3] + 1).toString(),
    preferredType: (answers[4] + 1).toString(),
  };

  console.log("Simple Search Request:", request);

  const { data } = await authenticated.post<SimpleSearchResponse>(
    "/recommendations/conditions",
    request
  );

  return data;
};
