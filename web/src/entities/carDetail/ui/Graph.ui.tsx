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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export function Graph() {
  return (
    <Container>
      <Radar data={graphData} options={graphOptions} />
    </Container>
  );
}

const Container = styled.div`
  padding: 10px 0 35px;
`;
