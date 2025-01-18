import styled from "styled-components";
import { RecommendCarList } from "./RecommendCarList";
const name = "타마마";
const nickname = "가성비의 열렬한 팬";
export const SimpleSearchResult = () => {
  return (
    <>
      <TitleWrap>
        <Title>
          {name}님은
          <br /> "<NickName>{nickname}</NickName>"이시군요!
        </Title>
        <SubTitle>{name}님에게 가장 적절한 차량을 추천해드렸어요.</SubTitle>
      </TitleWrap>
      <RecommendCarList />
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
