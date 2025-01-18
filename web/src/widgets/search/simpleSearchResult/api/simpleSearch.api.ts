import { TRecommendAnswersRequest } from "@/entities/simpleSearch/model/types";
import { authenticated } from "@/shared/lib/axios/axiosInstance";
import { SimpleSearchResponse } from "../model/types";

export const fetchSimpleSearchResult = async (
  answers: TRecommendAnswersRequest
): Promise<SimpleSearchResponse> => {
  const request = {
    budget: (answers[0] + 1).toString(),
    usage: (answers[1] + 1).toString(),
    maintenance: (answers[2] + 1).toString(),
    experience: (answers[3] + 1).toString(),
    preferredType: (answers[4] + 1).toString(),
  };

  // console.log("Simple Search Request:", request);

  const { data } = await authenticated.post<SimpleSearchResponse>(
    "/recommendations/conditions",
    request
  );

  return data;
};
