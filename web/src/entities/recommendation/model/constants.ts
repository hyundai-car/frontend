// import { Normalization } from "@/entities/recommendation/api/types"; 맞나
import { Normalization } from "@/shared/api/api.types";
import { keyframes } from "styled-components";

export const rotate = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;
export const shine = keyframes`
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
`;

export const graphOptions = {
  scales: {
    r: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      // 숫자(ticks) 관련 설정
      ticks: {
        min: 0,
        max: 100,
        stepSize: 20, // 눈금 간격 (0, 20, 40, 60, 80, 100)
        display: false,
      },

      grid: {
        color: "rgba(217, 217, 217, 0.48)", // 그리드(오각형) 선 색상
      },
      angleLines: {
        color: "rgba(217, 217, 217, 0.48)", // 방사형 선 색상
      },
    },
  },
  elements: {
    line: {
      borderWidth: 1,
      backgroundColor: "rgb(217, 217, 217",
    },
  },
  plugins: {
    legend: {
      labels: {
        boxWidth: 20,
        padding: 10,
        font: {
          size: 13,
        },
      },
    },
  },
};

export const graphData = (
  bestGraph: Normalization,
  avgGraph: Normalization
) => {
  return {
    labels: ["가성비점수", "무사고", "최초등록일", "연비", "주행거리"],
    datasets: [
      {
        label: "추천 차량",
        data: [
          Math.ceil(bestGraph.mmScoreNorm),
          Math.ceil(bestGraph.accidentCountNorm),
          Math.ceil(bestGraph.initialRegistrationNorm),
          Math.ceil(bestGraph.fuelEfficiencyNorm),
          Math.ceil(bestGraph.mileageNorm),
        ],
        fill: true,
        backgroundColor: "#9787ffa6",
        //   borderColor: "rgb(217, 217, 217)",
      },
      {
        label: "선택 차량 전체 평균",
        data: [
          Math.ceil(avgGraph.mmScoreNorm),
          Math.ceil(avgGraph.accidentCountNorm),
          Math.ceil(avgGraph.initialRegistrationNorm),
          Math.ceil(avgGraph.fuelEfficiencyNorm),
          Math.ceil(avgGraph.mileageNorm),
        ],
        fill: true,
        backgroundColor: "rgba(255, 255, 255, 0.66)",
        //   borderColor: "rgb(255, 255, 255)",
      },
    ],
  };
};
