import { useSimpleSearchStore } from "@/entities/simpleSearch/model/store";
import { DIAGNOSTIC_QUESTIONS } from "@/entities/simpleSearch/questionBlock/model/constants";
import { AnswerSelect } from "@/entities/simpleSearch/questionBlock/ui/AnswerSelect";
import { QuestionBlock } from "@/entities/simpleSearch/questionBlock/ui/QuestionBlock";

export function SimpleSearchStep() {
  const { currentStep, answers, setAnswer } = useSimpleSearchStore();
  // const currentQuestion = DIAGNOSTIC_QUESTIONS.find((q) => q.id === currentStep);
  // const currentAnswer = answers.find((a) => a.questionId === currentStep);
  const currentQuestionIndex = currentStep - 1;
  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];

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
            question={DIAGNOSTIC_QUESTIONS[currentQuestionIndex]}
            selectedAnswerIndex={answers[currentQuestionIndex]}
            // onAnswerChange={(optionId) => setAnswer(currentStep, optionId)}
            onAnswerChange={(index) =>
              setAnswer(currentQuestionIndex, index - 1)
            }
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
