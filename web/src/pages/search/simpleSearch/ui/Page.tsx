import { Outlet, useNavigate, useParams } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { SimpleSearchStep } from "@/shared/lib/react-router/router.types";
import { Icon } from "@/shared/ui/Icon/Icon";
import styled from "styled-components";
import { BasicButton } from "@/shared/ui/button";

import { useEffect } from "react";
import { DIAGNOSTIC_QUESTIONS } from "@/entities/simpleSearch/questionBlock/model/constants";
import { useSimpleSearchStore } from "@/entities/simpleSearch/model/store";

export function SimpleSearchPage() {
  const navigate = useNavigate();
  const { step } = useParams();
  const currentStep = Number(step || 1);

  const { answers, setStep, resetAnswers } = useSimpleSearchStore();
  // const currentAnswer = answers.find((a) => a.questionId === currentStep);
  // const hasSelection =
  //   currentAnswer && currentAnswer.selectedOptions.length > 0;
  const hasSelection = answers[currentStep - 1] !== -1;

  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

  // const printDebugAnswers = () => {
  //   console.log("========진단 결과========");
  //   answers.forEach((answer) => {
  //     const question = DIAGNOSTIC_QUESTIONS.find(
  //       (q) => q.id === answer.questionId
  //     );
  //     const selectedLabels = question?.isMultipleChoice
  //       ? answer.selectedOptions
  //           .map(
  //             (optionId) =>
  //               question.options.find((opt) => opt.id === optionId)?.label
  //           )
  //           .join(", ")
  //       : question?.options.find((opt) => opt.id === answer.questionId)?.label;

  //     console.log(`질문: ${question?.question}`);
  //     console.log(`선택: ${selectedLabels}`);
  //   });
  // };
  const printDebugAnswers = () => {
    console.log("========진단 결과========");
    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== -1) {
        const question = DIAGNOSTIC_QUESTIONS[questionIndex];
        const selectedOption = question?.options[answerIndex];

        console.log(`질문 ${questionIndex + 1}: ${question?.question}`);
        console.log(`응답 ${answerIndex + 1}: ${selectedOption?.label}`);
      }
    });
  };
  const handleNext = () => {
    if (!hasSelection) return;
    if (currentStep === 5) {
      // 결과보기 버튼 클릭 시
      printDebugAnswers(); // 디버깅용
      resetAnswers(); // answers 초기화
      navigate(pathKeys.simpleSearch.result()); // 결과 페이지 연결
    } else {
      navigate(
        pathKeys.simpleSearch.step({
          step: String(currentStep + 1).toString() as SimpleSearchStep,
        })
      ); // 리터럴 타입 강제 변환
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      navigate(
        pathKeys.simpleSearch.step({
          step: String(currentStep - 1).toString() as SimpleSearchStep,
        })
      );
    }
  };
  const handleBack = () => {
    navigate(-1); // 브라우저의 history stack에서 한 단계 뒤로 이동
  };

  return (
    <div>
      <Header>
        <Icon type="back" onClick={handleBack} />
        <Step>{currentStep}/5</Step>
      </Header>
      <Outlet />
      <Bottom>
        <ButtonWrap>
          {currentStep > 1 && currentStep < 5 && (
            <BasicButton color="navy" onClick={handlePrev}>
              이전
            </BasicButton>
          )}
          <BasicButton
            color="blue"
            onClick={handleNext}
            disabled={!hasSelection}
          >
            {currentStep === 5 ? "결과보기" : "다음"}
          </BasicButton>
        </ButtonWrap>
      </Bottom>
    </div>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const Step = styled.div`
  font-size: var(--regular-md-small);
`;

const Bottom = styled.div`
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
`;
