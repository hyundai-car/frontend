import { useEffect } from "react";
import { useSimpleSearchStore } from "../model/store";
import { DIAGNOSTIC_QUESTIONS } from "@/entities/simpleSearch/questionBlock/model/constants";
import { Icon } from "@/shared/ui/Icon/Icon";
import { SimpleSearchResult } from "@/widgets/search/simpleSearchResult/ui/simpleSearchResult";
export function SimpleSearchResultPage() {
  const answers = useSimpleSearchStore((state) => state.answers);
  useEffect(() => {
    if (!answers || answers.length === 0) {
      console.log("진단 결과가 없습니다.");
      return;
    }

    console.log("========진단 결과========");
    answers.forEach((answer) => {
      const question = DIAGNOSTIC_QUESTIONS.find(
        (q) => q.id === answer.questionId
      );
      // 선택된 옵션 ID들을 해당 라벨로 변환
      const selectedLabels = question?.isMultipleChoice
        ? answer.selectedOptions
            .map(
              (optionId) =>
                question.options.find((opt) => opt.id === optionId)?.label
            )
            .join(", ")
        : question?.options.find((opt) => opt.id === answer.questionId)?.label;

      console.log(`질문: ${question?.question}`);
      console.log(`선택: ${selectedLabels}`);
      console.log("-");
    });
  }, []);

  return (
    <div>
      <Header>
        <Icon type="close" size={17} onClick={() => {}} />
        <SimpleSearchResult />
      </Header>
    </div>
  );
}

import styled from "styled-components";
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: red;
`;
