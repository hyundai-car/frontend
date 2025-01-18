import { Checkbox } from "@/shared/ui/checkbox";
import { Answer, DiagnosticQuestion } from "../model/types";

interface Props {
  question: DiagnosticQuestion;
  answer?: Answer;
  onAnswerChange: (optionId: number) => void;
}

export function AnswerSelect({ question, answer, onAnswerChange }: Props) {
  return (
    <Wrap>
      {question.options.map((option) => (
        <CheckboxItem key={option.id}>
          <Checkbox
            checked={answer?.selectedOptions.includes(option.id) ?? false}
            onChange={() => onAnswerChange(option.id)}
            label={option.label}
          />
        </CheckboxItem>
      ))}
    </Wrap>
  );
}
import styled from "styled-components";
const Wrap = styled.div`
  margin-top: 50px;
`;
const CheckboxItem = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
