import { useQuery } from "@tanstack/react-query";

import { fetchCarList } from "./searchCarList.api";
export const useSearchCarListQuery = () => {
  return useQuery({
    queryKey: ["carList"],
    queryFn: () => fetchCarList(),
  });
};
