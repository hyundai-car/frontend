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
import {
  graphData,
  graphOptions,
} from "@/entities/recommendation/model/constants";
import { useRecommendationResult } from "@/widgets/recommendation/model/actions";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function Graph() {
  const { graph } = useRecommendationResult();
  const data = graphData(graph.best, graph.avg);

  return (
    <Container>
      <Radar data={data} options={graphOptions} />
    </Container>
  );
}

const Container = styled.div`
  padding: 10px 0 35px;
`;
