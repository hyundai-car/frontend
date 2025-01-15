const stepIcons = {
  1: "/icons/3d/calculator.svg",
  2: "/icons/3d/plan.svg",
  3: "/icons/3d/calendar.svg",
  4: "/icons/3d/trophy.svg",
  5: "/icons/3d/target.svg",
} as const;

export function SimpleSearchStep() {
  const {
    currentStep,
    questions,
    answers,
    setAnswer,
    isMultipleSelectionStep,
  } = useSimpleSearchStore();
  const currentQuestion = questions[currentStep];
  const currentAnswer = answers.find((a) => a.questionId === currentStep);

  const handleOptionChange = (optionId: number) => {
    setAnswer(currentStep, optionId);
  };
  return (
    <Container>
      <TitleWrap>
        {currentQuestion && (
          <Title>{currentQuestion.question.replace("|", "\n")}</Title>
        )}
        <Subtitle>
          {isMultipleSelectionStep(currentStep) ? "복수 선택" : ""}
        </Subtitle>
      </TitleWrap>
      <ImageContainer>
        <SImage src={stepIcons[currentStep as keyof typeof stepIcons]} />
      </ImageContainer>
      <Wrap>
        {currentQuestion &&
          currentQuestion.options.map((option) => (
            <CheckboxItem key={option.id}>
              <Checkbox
                checked={
                  currentAnswer?.selectedOptions?.includes(option.id) ?? false
                }
                onChange={() => handleOptionChange(option.id)}
                label={option.label}
              />
            </CheckboxItem>
          ))}
      </Wrap>
    </Container>
  );
}

import { Checkbox } from "@/shared/ui/checkbox";
import styled, { keyframes } from "styled-components";
import { useSimpleSearchStore } from "../model/store";
const float = keyframes`
 0% {
   transform: translateY(0);
 }
 50% {
   transform: translateY(20px);
 }
 100% {
   transform: translateY(0);
 }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleWrap = styled.div`
  height: 80px;
`;
const Title = styled.div`
  margin-top: 20px;
  font-size: var(--semi-bold--lg);
  font-weight: 600;
  white-space: pre-line;
`;
const Subtitle = styled.div`
  font-size: var(--regular--md);
  color: var(--dark-gray);
  margin-top: 10px;
`;
const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SImage = styled.img`
  width: 200px;
  object-fit: cover;
  animation: ${float} 5s ease-in-out infinite;
`;

const Wrap = styled.div`
  margin-top: 50px;
`;
const CheckboxItem = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
