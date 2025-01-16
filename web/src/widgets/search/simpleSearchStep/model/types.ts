import { DiagnosticQuestion } from "@/entities/simpleSearch/questionBlock/model/types";

export interface SimpleSearchStepProps {
  currentQuestion: DiagnosticQuestion;
  currentAnswer?: {
    questionId: number;
    selectedOptions: number[];
  };
  isMultipleChoice: boolean;
  onAnswerChange: (optionId: number) => void;
}
