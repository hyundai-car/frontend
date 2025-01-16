export interface DiagnosticQuestion {
  id: number;
  question: string;
  options: {
    id: number;
    label: string;
  }[];
  isMultipleChoice: boolean;
}
export interface Answer {
  questionId: number;
  selectedOptions: number[];
}
