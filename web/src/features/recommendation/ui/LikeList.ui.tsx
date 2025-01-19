import { useRecommendationStore } from "@/features/recommendation/model/store";
import { useCheckboxGroup } from "@/features/recommendation/model/useCheckboxGroup";
import { LikeCard } from "@/features/recommendation/ui/LikeCard.ui";
// import { MOCK_LikeList } from "@/entities/recommendation/model/mock";
import { Checkbox } from "@/shared/ui/checkbox";
import { useEffect } from "react";
import styled from "styled-components";
import { useGetLikeListQuery } from "@/features/recommendation/model/queries";
import { LikeItem } from "@/features/recommendation/api/api.types";

export function LikeList() {
  // const cardList = MOCK_LikeList;
  const { data } = useGetLikeListQuery();
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
  } = useCheckboxGroup<LikeItem>([], "carId");

  useEffect(() => {
    setHasCheckedItems(checkedItems.size > 0);
    localStorage.setItem(
      "checkedItems",
      JSON.stringify(Array.from(checkedItems))
    );
  }, [checkedItems, setHasCheckedItems]);

  const contents = data?.contents ?? [];

  return (
    <Container>
      <HeaderSection>
        <Wrap>
          <Checkbox
            checked={isAllChecked(contents)}
            onChange={() => {
              toggleAll(contents);
            }}
            disabled={data?.contents.length === 0}
          />
          <Description>전체 선택</Description>
        </Wrap>

        <Description>
          전체 <span>{checkedItems.size}</span>개
        </Description>
      </HeaderSection>

      <ListSection>
        {contents.map((item) => (
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
