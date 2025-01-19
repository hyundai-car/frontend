import styled, { keyframes } from "styled-components";
import { RecommendCarList } from "./RecommendCarList";
import { useEffect, useState } from "react";
import { getLocalStorageValue } from "@/shared/util/localStorage";

export const SimpleSearchResult = () => {
  const [recommendCondition, setRecommendCondition] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = JSON.parse(getLocalStorageValue("userInfo") || "{}");
  useEffect(() => {
    console.log(recommendCondition);
  }, [recommendCondition]);

  return (
    <>
      <TitleWrap>
        <Title>
          {userInfo.name || "홍길동"}님!
          <br />
          {isLoading ? (
            <>
              <LoadingText>"추천 차량을 찾고 있어요..."</LoadingText>
              <br />
              <LoadingDots>...</LoadingDots>
            </>
          ) : (
            <>
              "<NickName>{recommendCondition}</NickName>"<br />
              추천해드릴게요.
            </>
          )}
        </Title>
        <SubTitle>
          {isLoading ? (
            <>
              가장 적합한 차량을 선별하고 있습니다
              <LoadingDots>...</LoadingDots>
            </>
          ) : (
            `${
              userInfo.name || "홍길동"
            }님에게 가장 적절한 차량을 추천해드렸어요.`
          )}
        </SubTitle>
      </TitleWrap>
      <RecommendCarList
        setRecommendCondition={setRecommendCondition}
        setIsLoading={setIsLoading}
      />
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
const fadeInOut = keyframes`
 0% { opacity: 0.3; }
 50% { opacity: 1; }
 100% { opacity: 0.3; }
`;

const dotsAnimation = keyframes`
 0% { content: '.'; }
 33% { content: '..'; }
 66% { content: '...'; }
 100% { content: '.'; }
`;

const LoadingText = styled.span`
  animation: ${fadeInOut} 2s infinite ease-in-out;
  display: inline-block;
`;

const LoadingDots = styled.span`
  &::after {
    content: "";
    animation: ${dotsAnimation} 1.5s infinite;
  }
`;
