// entity: DiagnosticQuestion/QuestionBlock
import { DiagnosticQuestion } from "./types";
export const STEP_ICONS = {
  1: "/icons/3d/calculator.svg",
  2: "/icons/3d/plan.svg",
  3: "/icons/3d/calendar.svg",
  4: "/icons/3d/trophy.svg",
  5: "/icons/3d/target.svg",
} as const;

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    question: "예산 범위를 선택해주세요.",
    options: [
      { id: 1, label: "선택하지 않음" },
      { id: 2, label: "2,000만원 이하" },
      { id: 3, label: "2,000만원 ~ 4,000만원" },
      { id: 4, label: "4,000만원 ~ 6,000만원" },
      { id: 5, label: "6,000만원 이상" },
    ],
    isMultipleChoice: false,
  },
  {
    id: 2,
    question: "주로 어떤 용도로| 차를 사용하실 계획인가요?",
    options: [
      { id: 1, label: "출퇴근 및 도심 주행" },
      { id: 2, label: "장거리 여행 " },
      { id: 3, label: "주말 레저 활동" },
      { id: 4, label: "가족/친구들과의 외출" },
      { id: 5, label: "업무 용도" },
    ],
    isMultipleChoice: false,
  },
  {
    id: 3,
    question: "차량 관리에 투자할 수 있는| 월 평균 비용은 어느 정도인가요?",
    options: [
      { id: 1, label: "20만원 이하" },
      { id: 2, label: "20만원 ~ 30만원" },
      { id: 3, label: "30만원 ~ 40만원" },
      { id: 4, label: "40만원 ~ 50만원" },
      { id: 5, label: "50만원 이상" },
    ],
    isMultipleChoice: false,
  },
  {
    id: 4,
    question: "운전 경험과 숙련도는| 어느 정도인가요?",
    options: [
      { id: 1, label: "운전면허만 있음" },
      { id: 2, label: "1년 미만" },
      { id: 3, label: "1년 ~ 3년" },
      { id: 4, label: "3년 이상" },
      { id: 5, label: "숙련된 운전자" },
    ],
    isMultipleChoice: false,
  },
  {
    id: 5,
    question: "선호하는 차량 타입이 있다면?",
    options: [
      { id: 1, label: "상관없음" },
      { id: 2, label: "경차" },
      { id: 3, label: "세단" },
      { id: 4, label: "SUV" },
      { id: 5, label: "밴" },
    ],
    isMultipleChoice: false,
  },
];
