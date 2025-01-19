import { LikeListResponse } from "@/features/recommendation/api/api.types";
import {
  getLikeListApi,
  postCandidatesApi,
} from "@/features/recommendation/api/candidates.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useGetLikeListQuery = () => {
  return useQuery<LikeListResponse>({
    queryKey: ["likeList"],
    queryFn: () => getLikeListApi(),
  });
};

export const usePostCandidatesQuery = () => {
  //   const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (carIdList: number[]) => postCandidatesApi(carIdList),
    onSuccess: (response) => {
      localStorage.setItem("recommendationResult", JSON.stringify(response));
      navigate("/recommendation/result");
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
