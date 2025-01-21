import styled from "styled-components";
import { RecommendCarList } from "./RecommendCarList";
import { useEffect, useState } from "react";
import { getLocalStorageValue } from "@/shared/util/localStorage";
import { LoadingScreen } from "./LoadingScreen";

export const SimpleSearchResult = () => {
  const [recommendCondition, setRecommendCondition] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userName = getLocalStorageValue("userName")
  useEffect(() => {
    console.log(recommendCondition);
  }, [recommendCondition]);

  return (
    <>
      <TitleWrap>
        <Title>
          {userName || "사용자"}님!
          <br />
          {isLoading ? (
            <>
              <LoadingScreen />
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
            <>가장 적합한 차량을 선별하고 있습니다</>
          ) : (
            `${userName || "사용자"
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
