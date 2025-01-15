import { create } from "zustand";

type Answer = {
  questionId: number;
  selectedOptions: number[];
};

interface SimpleSearchState {
  currentStep: number;
  answers: Answer[];
  questions: {
    [key: number]: {
      question: string;
      options: { id: number; label: string }[];
    };
  };
  // 액션들
  setStep: (step: number) => void;
  setAnswer: (questionId: number, optionId: number) => void;
  resetAnswers: () => void;
  isMultipleSelectionStep: (step: number) => boolean; // 복수선택이 가능한 스텝인지 확인하는 함수
}

export const useSimpleSearchStore = create<SimpleSearchState>((set) => ({
  currentStep: 1,
  answers: [],
  questions: {
    1: {
      question: "예산 범위를 선택해주세요.",
      options: [
        { id: 1, label: "선택하지 않음" },
        { id: 2, label: "2,000만원 이하" },
        { id: 3, label: "2,000만원 ~ 4,000만원" },
        { id: 4, label: "4,000만원 ~ 6,000만원" },
        { id: 5, label: "6,000만원 이상" },
      ],
    },
    2: {
      question: "주로 어떤 용도로| 차를 사용하실 계획인가요?",
      options: [
        { id: 1, label: "출퇴근 및 도심 주행" },
        { id: 2, label: "장거리 여행 " },
        { id: 3, label: "주말 레저 활동" },
        { id: 4, label: "가족/친구들과의 외출" },
        { id: 5, label: "업무 용도" },
      ],
    },
    3: {
      question: "차량 관리에 투자할 수 있는| 월 평균 비용은 어느 정도인가요?",
      options: [
        { id: 1, label: "20만원 이하" },
        { id: 2, label: "20만원 ~ 30만원" },
        { id: 3, label: "30만원 ~ 40만원" },
        { id: 4, label: "40만원 ~ 50만원" },
        { id: 5, label: "50만원 이상" },
      ],
    },
    4: {
      question: "운전 경험과 숙련도는| 어느 정도인가요?",
      options: [
        { id: 1, label: "운전면허만 있음" },
        { id: 2, label: "1년 미만" },
        { id: 3, label: "1년 ~ 3년" },
        { id: 4, label: "3년 이상" },
        { id: 5, label: "숙련된 운전자" },
      ],
    },
    5: {
      question: "선호하는 차량 타입이 있다면?",
      options: [
        { id: 1, label: "상관없음" },
        { id: 2, label: "경차" },
        { id: 3, label: "세단" },
        { id: 4, label: "SUV" },
        { id: 5, label: "밴" },
      ],
    },
  },

  isMultipleSelectionStep: (step: number) => [2, 5].includes(step),

  setStep: (step) => set({ currentStep: step }),

  setAnswer: (questionId, optionId) =>
    set((state) => {
      const isMultiple = [2, 5].includes(questionId);
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.questionId === questionId
      );
      const newAnswers = [...state.answers];

      if (existingAnswerIndex > -1) {
        const existing = newAnswers[existingAnswerIndex];
        if (isMultiple) {
          // 복수 선택 스텝의 경우
          const selectedOptions =
            existing && existing.selectedOptions.includes(optionId)
              ? existing.selectedOptions.filter((id) => id !== optionId)
              : existing
              ? [...existing.selectedOptions, optionId]
              : [optionId];
          newAnswers[existingAnswerIndex] = {
            questionId,
            selectedOptions,
          };
        } else {
          // 단일 선택 스텝의 경우
          newAnswers[existingAnswerIndex] = {
            questionId,
            selectedOptions:
              existing?.selectedOptions[0] === optionId ? [] : [optionId],
          };
        }
      } else {
        newAnswers.push({
          questionId,
          selectedOptions: [optionId],
        });
      }

      return { answers: newAnswers };
    }),

  resetAnswers: () => set({ answers: [] }),
}));
