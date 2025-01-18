import { LikeListResponse } from "@/features/recommendation/api/api.types";
import { getLikeListApi } from "@/features/recommendation/api/candidates.api";
import { useQuery } from "@tanstack/react-query";

export const useGetLikeListQuery = () => {
  return useQuery<LikeListResponse>({
    queryKey: ["likeList"],
    queryFn: () => getLikeListApi(),
  });
};
