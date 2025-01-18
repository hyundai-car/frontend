import { useQuery } from "@tanstack/react-query";
import { fetchSimpleSearchResult } from "./simpleSearch.api";
import { TRecommendAnswersRequest } from "@/entities/simpleSearch/model/types";

export const useSimpleSearchQuery = (answers: TRecommendAnswersRequest) => {
  return useQuery({
    queryKey: ["simpleSearch", answers],
    queryFn: () => fetchSimpleSearchResult(answers),
    staleTime: 1000 * 60,
  });
};
