import { Outlet, useNavigate, useParams } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import { SimpleSearchStep } from "@/shared/lib/react-router/router.types";
import { Icon } from "@/shared/ui/Icon/Icon";
import styled from "styled-components";
import { BasicButton } from "@/shared/ui/button";
import { useSimpleSearchStore } from "../model/store";
import { useEffect } from "react";

export function SimpleSearchPage() {
  const navigate = useNavigate();
  const { step } = useParams();
  const currentStep = Number(step || 1);

  const { answers, setStep } = useSimpleSearchStore();
  const currentAnswer = answers.find((a) => a.questionId === currentStep);
  const hasSelection =
    currentAnswer && currentAnswer.selectedOptions.length > 0;

  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

  const handleNext = () => {
    if (!hasSelection) return;

    if (currentStep === 5) {
      navigate(pathKeys.simpleSearch.result({ resultId: "123" }));
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
