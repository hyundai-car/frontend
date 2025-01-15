import { BasicButton } from "@/shared/ui/button";
import { Comparision } from "@/widgets/recommendation/ui/Comparison.ui";
import { Recommendation } from "@/widgets/recommendation/ui/Recommendation.ui";
import styled from "styled-components";

export function RecommendationPage() {
  //TODO api

  return (
    <Container>
      {/* 결과 */}
      <Recommendation />

      {/* 비교 */}
      <Comparision />

      <ButtonWrap>
        <BasicButton
          color="blue"
          onClick={function (): void {
            console.log("추천 상세 페이지 url");
          }}
          disabled={false}
        >
          보러 가기
        </BasicButton>
      </ButtonWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  border: 1px solid black;
`;
