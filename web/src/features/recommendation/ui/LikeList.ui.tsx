import { SelectCard } from "@/features/recommendation/model/card.types";
import { useCheckboxGroup } from "@/features/recommendation/model/useCheckboxGroup";
import { LikeCard } from "@/features/recommendation/ui/LikeCard.ui";
import { MOCK_LikeList } from "@/pages/recommendation/model/mock";
import { Checkbox } from "@/shared/ui/checkbox/Checkbox.ui";
import React, { useState } from "react";
import styled from "styled-components";

export function LikeList() {
  //TODO 임시데이터
  const [cardList, setCardList] = useState<SelectCard[]>(MOCK_LikeList);

  const {
    checkedItems,
    isChecked,
    toggleItem,
    toggleAll,
    isAllChecked,
    getCheckedItems,
  } = useCheckboxGroup<SelectCard>([], "carId");

  
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

        <Description>전체 2개</Description>
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

const Container = styled.div``;
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
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding-top: 14.5px;
`;
