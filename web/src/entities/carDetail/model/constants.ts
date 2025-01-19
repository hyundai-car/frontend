import { Normalization } from "@/shared/api/api.types";

export const itemName = [
  "내비게이션",
  "하이패스",
  "열선 스티어링 휠",
  "열선시트",
  "통풍시트",
  "전동시트",
  "가죽시트",
  "전동식 트렁크",
  "선루프",
  "헤드업 디스플레이",
  "서라운드 뷰 모니터",
  "후방 모니터",
  "후측방 경보 시스템",
  "차선 이탈 경보",
  "스마트 크루즈 컨트롤",
  "전방 주차거리",
] as const;

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
      display: false,
    },
  },
};

export const graphData = (graphData: Normalization) => {
  console.log("d", graphData);
  return {
    labels: ["가성비점수", "사고이력", "최초등록일", "연비", "주행거리"],
    datasets: [
      {
        label: "추천 차량",
        data: [
          Math.ceil(graphData.mmScoreNorm),
          Math.ceil(graphData.accidentCountNorm),
          Math.ceil(graphData.initialRegistrationNorm),
          Math.ceil(graphData.fuelEfficiencyNorm),
          Math.ceil(graphData.mileageNorm),
        ],
        fill: true,
        backgroundColor: "#9787ffa6",
        //   borderColor: "rgb(217, 217, 217)",
      },
    ],
  };
};
