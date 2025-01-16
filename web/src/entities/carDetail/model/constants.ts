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

export const graphData = {
  labels: ["가성비점수", "사고이력", "최초등록일", "연비", "주행거리"],
  datasets: [
    {
      label: "추천 차량",
      data: [65, 59, 90, 81, 56],
      fill: true,
      backgroundColor: "#9787ffa6",
      //   borderColor: "rgb(217, 217, 217)",
    },
  ],
};
