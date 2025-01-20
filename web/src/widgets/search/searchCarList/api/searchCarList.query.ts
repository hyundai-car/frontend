import { useSearchStore } from "@/features/search";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCarList } from "./searchCarList.api";

export const useSearchCarListQuery = () => {
  const { keyword, filters } = useSearchStore();

  return useInfiniteQuery({
    queryKey: ["cars", keyword, filters],
    queryFn: ({ pageParam = 0 }) => fetchCarList(keyword, filters, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.pageNumber + 1,
    staleTime: 1000 * 60,
  });
};
