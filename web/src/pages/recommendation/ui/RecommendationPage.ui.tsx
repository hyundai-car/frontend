import { Result } from "@/widgets/recommendation/ui/Result.ui";
import styled from "styled-components";

export function RecommendationPage() {
  //TODO api

  return (
    <Container>
      {/* 결과 */}
      <Result />

      {/* 비교 */}
    </Container>
  );
}

const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  padding: 0 20px;
`;
