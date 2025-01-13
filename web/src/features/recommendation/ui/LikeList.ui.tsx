import { SelectCard } from "@/features/recommendation/model/card.types";
import { LikeCard } from "@/features/recommendation/ui/LikeCard.ui";
import { MOCK_LikeList } from "@/pages/recommendation/model/mock";
import { Checkbox } from "@/shared/ui/checkbox/Checkbox.ui";
import React, { useState } from "react";
import styled from "styled-components";

export function LikeList() {
  //TODO 임시데이터
  const [cardList, setCardList] = useState<SelectCard[]>(MOCK_LikeList);

  return (
    <Container>
      <HeaderSection>
        <Wrap>
          <Checkbox checked={true} onChange={() => {}} disabled={false} />
          <Description>전체 선택</Description>
        </Wrap>

        <Description>전체 2개</Description>
      </HeaderSection>

      <ListSection>
        {cardList.map((item) => (
          <LikeCard item={item} />
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
