import { DIAGNOSTIC_QUESTIONS } from "@/entities/simpleSearch/questionBlock/model/constants";
import { AnswerSelect } from "@/entities/simpleSearch/questionBlock/ui/AnswerSelect";
import { QuestionBlock } from "@/entities/simpleSearch/questionBlock/ui/QuestionBlock";
import { useSimpleSearchStore } from "@/pages/search/simpleSearch/model/store";

export function SimpleSearchStep() {
  const { currentStep, answers, setAnswer } = useSimpleSearchStore();
  const currentQuestion = DIAGNOSTIC_QUESTIONS.find(
    (q) => q.id === currentStep
  );
  const currentAnswer = answers.find((a) => a.questionId === currentStep);

  if (!currentQuestion) return null;
  return (
    <Container>
      {currentQuestion && (
        <>
          <QuestionBlock
            question={{
              id: currentStep,
              question: currentQuestion.question,
              options: currentQuestion.options,
              isMultipleChoice: currentQuestion.isMultipleChoice,
            }}
          />
          <AnswerSelect
            question={currentQuestion}
            answer={currentAnswer}
            onAnswerChange={(optionId) => setAnswer(currentStep, optionId)}
          />
        </>
      )}
    </Container>
  );
}

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
