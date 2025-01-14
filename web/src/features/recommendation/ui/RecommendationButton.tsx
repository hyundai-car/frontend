import { handleRecommendBtn } from "@/features/recommendation/model/actions";
import { useRecommendationStore } from "@/features/recommendation/model/store";
import { BasicButton } from "@/shared/ui/button/BasicButton.ui";

export function RecommendationButton() {
  const hasCheckedItems = useRecommendationStore(
    (state) => state.hasCheckedItems
  );

  return (
    <BasicButton disabled={!hasCheckedItems} onClick={handleRecommendBtn}>
      추천 받기
    </BasicButton>
  );
}
