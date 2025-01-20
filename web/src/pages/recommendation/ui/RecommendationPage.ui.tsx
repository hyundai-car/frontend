import { BasicButton } from "@/shared/ui/button";
import { useRecommendationResult } from "@/widgets/recommendation/model/actions";
import { Comparision } from "@/widgets/recommendation/ui/Comparison.ui";
import { Recommendation } from "@/widgets/recommendation/ui/Recommendation.ui";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function RecommendationPage() {
  //TODO api
  const { bestCarId } = useRecommendationResult();
  const navigate = useNavigate();
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
            navigate(`/cars/carsDetail?carNo=${bestCarId}`);
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
  min-height: 100dvh;
  padding: 0 20px;
  margin-bottom: 95px;

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
