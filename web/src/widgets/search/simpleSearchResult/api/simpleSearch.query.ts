import { useQuery } from "@tanstack/react-query";
import { fetchSimpleSearchResult } from "./simpleSearch.api";
import { TSimpleSearchAnswers } from "@/entities/simpleSearch/model/types";

export const useSimpleSearchQuery = (answers: TSimpleSearchAnswers) => {
  return useQuery({
    queryKey: ["simpleSearch", answers],
    queryFn: () => fetchSimpleSearchResult(answers),
    staleTime: 1000 * 60,
  });
};
