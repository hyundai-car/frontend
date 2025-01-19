import { Checkbox } from "@/shared/ui/checkbox";
import { DiagnosticQuestion } from "../model/types";

interface Props {
  question: DiagnosticQuestion | undefined;
  // answer?: Answer;
  selectedAnswerIndex: number | undefined;
  onAnswerChange: (optionId: number) => void;
}

export function AnswerSelect({
  question,
  selectedAnswerIndex,
  onAnswerChange,
}: Props) {
  return (
    <Wrap>
      {question?.options.map((option, index) => (
        <CheckboxItem key={option.id}>
          <Checkbox
            // checked={answer?.selectedOptions.includes(option.id) ?? false}
            checked={selectedAnswerIndex === index}
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
