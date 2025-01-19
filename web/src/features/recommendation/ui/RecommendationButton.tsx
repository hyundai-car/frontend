import { usePostCandidatesQuery } from "@/features/recommendation/model/queries";
import { useRecommendationStore } from "@/features/recommendation/model/store";
import { BasicButton } from "@/shared/ui/button/BasicButton.ui";

export function RecommendationButton() {
  const hasCheckedItems = useRecommendationStore(
    (state) => state.hasCheckedItems
  );
  const mutation = usePostCandidatesQuery();

  const handleRecommendBtn = () => {
    const checkedItems = localStorage.getItem("checkedItems");
    const keyIdList: number[] = checkedItems ? JSON.parse(checkedItems) : [];

    mutation.mutate(keyIdList);
  };

  return (
    <BasicButton disabled={!hasCheckedItems} onClick={handleRecommendBtn}>
      추천 받기
    </BasicButton>
  );
}
