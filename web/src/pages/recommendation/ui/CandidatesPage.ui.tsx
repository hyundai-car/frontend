import { LikeList } from "@/features/recommendation";
import { RecommendationButton } from "@/features/recommendation/ui/RecommendationButton";
import React from "react";
import styled from "styled-components";

export function RecommendationPage() {
  return (
    <Container>
      <Description>
        찜한 목록을 AI가 분석하여 최고의 상품을 추천해줍니다.
      </Description>
      <LikeList />
      <ButtonWrap>
        <RecommendationButton />
      </ButtonWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  padding: 0 20px;
`;

const Description = styled.p`
  color: var(--dark-gray);
  font-size: var(--regular--md);
  margin-bottom: 20px;
`;
const ButtonWrap = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px;
  background-color: var(--white);
  border-radius: 8px;
`;
