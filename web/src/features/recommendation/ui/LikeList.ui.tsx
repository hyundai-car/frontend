import { useRecommendationStore } from "@/features/recommendation/model/store";
import { SelectCard } from "@/features/recommendation/model/types";
import { useCheckboxGroup } from "@/features/recommendation/model/useCheckboxGroup";
import { LikeCard } from "@/features/recommendation/ui/LikeCard.ui";
import { MOCK_LikeList } from "@/pages/recommendation/model/mock";
import { Checkbox } from "@/shared/ui/checkbox";
import { useEffect } from "react";
import styled from "styled-components";

export function LikeList() {
  //TODO 임시데이터
  // const [cardList, setCardList] = useState<SelectCard[]>(MOCK_LikeList);
  const cardList = MOCK_LikeList;
  const setHasCheckedItems = useRecommendationStore(
    (state) => state.setHasCheckedItems
  );

  const {
    checkedItems,
    isChecked,
    toggleItem,
    toggleAll,
    isAllChecked,
    // getCheckedItems,
  } = useCheckboxGroup<SelectCard>([], "carId");

  useEffect(() => {
    setHasCheckedItems(checkedItems.size > 0);
  }, [checkedItems, setHasCheckedItems]);

  return (
    <Container>
      <HeaderSection>
        <Wrap>
          <Checkbox
            checked={isAllChecked(cardList)}
            onChange={() => {
              toggleAll(cardList);
            }}
            disabled={cardList.length === 0}
          />
          <Description>전체 선택</Description>
        </Wrap>

        <Description>
          전체 <span>{cardList.length}</span>개
        </Description>
      </HeaderSection>

      <ListSection>
        {cardList.map((item) => (
          <LikeCard
            key={item.carId}
            item={item}
            checked={isChecked(item.carId)}
            onChange={() => toggleItem(item.carId)}
          />
        ))}
      </ListSection>
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 100px;
`;
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Wrap = styled.div`
  display: flex;
  align-items: center;
`;
const Description = styled.p`
  font-size: var(--semi-bold--md);
  font-weight: 600;
  span {
    color: var(--blue);
  }
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding-top: 14.5px;
`;
