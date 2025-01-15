import React from "react";
import { useSimpleSearchStore } from "../model/store";

export function SimpleSearchResult() {
  const { answers, questions } = useSimpleSearchStore();
  console.log(answers);
  return (
    <Container>
      <Title>진단 결과</Title>
      <ResponseList>
        {answers.map((answer) => (
          <ResponseItem key={answer.questionId}>
            <Question>{questions[answer.questionId]?.question}</Question>
            <Answer>
              선택:{" "}
              {answer.selectedOptions.length > 0
                ? answer.selectedOptions
                    .map(
                      (optionId) =>
                        questions[answer.questionId]?.options?.find(
                          (opt) => opt.id === optionId
                        )?.label
                    )
                    .join(", ")
                : "답변 없음"}
            </Answer>
          </ResponseItem>
        ))}
      </ResponseList>
    </Container>
  );
}
import styled from "styled-components";
const Container = styled.div`
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
`;

const ResponseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ResponseItem = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const Question = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const Answer = styled.div`
  color: #666;
`;
