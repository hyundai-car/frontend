import styled from "styled-components";
import { RecommendCarList } from "./RecommendCarList";
import { useState } from "react";
import { getLocalStorageValue } from "@/shared/util/localStorage";

export const SimpleSearchResult = () => {
  const [recommendCondition, setRecommendCondition] =
    useState("가성비의 열렬한 팬");
  const userInfo = JSON.parse(getLocalStorageValue("userInfo") || "{}");
  return (
    <>
      <TitleWrap>
        <Title>
          {userInfo.name || "누구냐너"}님!
          <br /> "<NickName>{recommendCondition}</NickName>"<br />
          추천해드릴게요.
        </Title>
        <SubTitle>
          {userInfo.name || "누구냐너"}님에게 가장 적절한 차량을 추천해드렸어요.
        </SubTitle>
      </TitleWrap>
      <RecommendCarList setRecommendCondition={setRecommendCondition} />
      <div style={{ height: "20px" }}></div>
    </>
  );
};

const TitleWrap = styled.div`
  margin-bottom: 20px;
`;
const Title = styled.div`
  font-size: var(--semi-bold--lg);
  font-weight: 700;
  line-height: 34px;
  margin-bottom: 10px;
`;
const NickName = styled.span`
  color: var(--blue);
`;
const SubTitle = styled.div`
  font-size: 13px;
`;
