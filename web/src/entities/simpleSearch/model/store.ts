import { DIAGNOSTIC_QUESTIONS } from "@/entities/simpleSearch/questionBlock/model/constants";
//import { Answer } from "@/entities/simpleSearch/questionBlock/model/types";
import { create } from "zustand";
// interface SimpleSearchState {
//   currentStep: number;
//   answers: Answer[];
//   setStep: (step: number) => void;
//   setAnswer: (questionId: number, optionId: number) => void;
//   resetAnswers: () => void;
// }

// export const useSimpleSearchStore = create<SimpleSearchState>((set) => ({
//   currentStep: 1,
//   answers: [],

//   setStep: (step) => set({ currentStep: step }),

//   setAnswer: (questionId, optionId) =>
//     set((state) => {
//       const currentQuestion = DIAGNOSTIC_QUESTIONS.find(
//         (q) => q.id === questionId
//       );
//       if (!currentQuestion) return state;

//       const existingAnswerIndex = state.answers.findIndex(
//         (a) => a.questionId === questionId
//       );
//       const newAnswers = [...state.answers];

//       if (existingAnswerIndex > -1) {
//         const existing = newAnswers[existingAnswerIndex];
//         if (currentQuestion.isMultipleChoice) {
//           const selectedOptions = existing?.selectedOptions.includes(optionId)
//             ? existing.selectedOptions.filter((id) => id !== optionId)
//             : existing
//             ? [...existing.selectedOptions, optionId]
//             : [optionId];
//           newAnswers[existingAnswerIndex] = {
//             questionId,
//             selectedOptions,
//           };
//         } else {
//           newAnswers[existingAnswerIndex] = {
//             questionId,
//             selectedOptions:
//               existing?.selectedOptions[0] === optionId ? [] : [optionId],
//           };
//         }
//       } else {
//         newAnswers.push({
//           questionId,
//           selectedOptions: [optionId],
//         });
//       }

//       return { answers: newAnswers };
//     }),

//   resetAnswers: () => set({ answers: [] }),
// }));

interface SimpleSearchState {
  currentStep: number;
  answers: number[]; // 각 질문의 응답을 인덱스로 저장 (0-4)
  setStep: (step: number) => void;
  setAnswer: (questionIndex: number, answerIndex: number) => void;
  resetAnswers: () => void;
}

export const useSimpleSearchStore = create<SimpleSearchState>((set) => ({
  currentStep: 1,
  answers: new Array(DIAGNOSTIC_QUESTIONS.length).fill(-1), // 초기값 -1로 설정 (미응답 상태)

  setStep: (step) => set({ currentStep: step }),

  setAnswer: (questionIndex, answerIndex) =>
    set((state) => {
      const newAnswers = [...state.answers];
      newAnswers[questionIndex] = answerIndex;
      return { answers: newAnswers };
    }),

  resetAnswers: () =>
    set({ answers: new Array(DIAGNOSTIC_QUESTIONS.length).fill(-1) }),
}));
