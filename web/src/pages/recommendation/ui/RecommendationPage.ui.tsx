import { Comparision } from "@/widgets/recommendation/ui/Comparison.ui";
import { Recommendation } from "@/widgets/recommendation/ui/Recommendation.ui";
import styled from "styled-components";

export function RecommendationPage() {
  //TODO api

  return (
    <Container>
      {/* 결과 */}
      {/* <Recommendation /> */}

      {/* 비교 */}
      <Comparision />
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
