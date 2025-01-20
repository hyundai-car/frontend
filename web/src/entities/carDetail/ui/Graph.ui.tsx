import styled from "styled-components";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { graphData, graphOptions } from "@/entities/carDetail/model/constants";
import { useCarDetailStore } from "@/pages/carDetail/model/store";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function Graph() {
  const { carGraphData } = useCarDetailStore();
  if (!carGraphData) {
    return null;
  }

  const data = graphData(carGraphData);

  // 그래프 정보 : 가성비점수, 사고이력, 최초등록일, 연비, 주행거리
  return (
    <Container>
      <Radar data={data} options={graphOptions} />
    </Container>
  );
}

const Container = styled.div`
  padding: 10px 0 35px;
`;
