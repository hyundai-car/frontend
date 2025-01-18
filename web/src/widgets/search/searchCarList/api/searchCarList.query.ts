import { useSearchStore } from "@/features/search";
import { useQuery } from "@tanstack/react-query";
import { fetchCarList } from "./searchCarList.api";

// import { fetchCarList } from "./searchCarList.api";
// export const useSearchCarListQuery = () => {
//   return useQuery({
//     queryKey: ["carList"],
//     queryFn: () => fetchCarList(),
//   });
// };

export const useSearchCarListQuery = () => {
  const { keyword, filters } = useSearchStore();

  return useQuery({
    queryKey: ["cars", keyword, filters],
    queryFn: () => fetchCarList(keyword, filters),
    staleTime: 1000 * 60,
  });
};
