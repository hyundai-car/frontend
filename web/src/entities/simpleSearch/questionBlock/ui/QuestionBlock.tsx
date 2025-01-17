import { STEP_ICONS } from "../model/constants";
import { DiagnosticQuestion } from "../model/types";

interface Props {
  question: DiagnosticQuestion;
}

export function QuestionBlock({ question }: Props) {
  return (
    <Container>
      <TitleWrap>
        <Title>{question.question.replace("|", "\n")}</Title>
        <Subtitle>{question.isMultipleChoice ? "복수 선택" : ""}</Subtitle>
      </TitleWrap>
      <ImageContainer>
        <Image src={STEP_ICONS[question.id as keyof typeof STEP_ICONS]} />
      </ImageContainer>
    </Container>
  );
}
import styled, { keyframes } from "styled-components";

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
  margin-top: 20px;
`;

const Image = styled.img`
  width: 200px;
  object-fit: cover;
  animation: ${float} 5s ease-in-out infinite;
`;
