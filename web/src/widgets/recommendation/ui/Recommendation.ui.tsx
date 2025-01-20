import { Graph } from "@/entities/recommendation/ui/Graph.ui";
import { RecommendationCard } from "@/entities/recommendation/ui/RecommendationCard.ui";
import { DebugWrapper } from "@/widgets/DebugToggle";
import { GridList } from "@/widgets/recommendation/ui/GridList.ui";
import styled from "styled-components";

// 여기서 entity인 Result에 그리드widget(bottomSlot), 그래프widget(topSlot) 컴포넌트 넘겨줘야 한다.
export function Recommendation() {
  const userName = "타마마"; //TODO

  return (
    <Container>
      <Title>
        <h1>
          <span>{userName}</span> 님을 위한 차는?
        </h1>
        <p>선택 차량 중 {userName}님께 딱 맞는 차를 추천해드릴게요!</p>
      </Title>
      <DebugWrapper layerName="entities/RecommendationCard">
        <RecommendationCard topSlot={<Graph />} bottomSlot={<GridList />} />
      </DebugWrapper>
    </Container>
  );
}

const Container = styled.div``;
const Title = styled.div`
  h1 {
    font-size: var(--semi-bold--lg);
    font-weight: 600;
    span {
      font-size: var(--semi-bold--xxl);
      font-weight: 600;
      color: var(--blue);
    }
  }
  p {
    color: var(--dark-gray);
    font-size: var(--regular--md);
    margin-bottom: 20px;
    margin-top: 5px;
  }
`;
