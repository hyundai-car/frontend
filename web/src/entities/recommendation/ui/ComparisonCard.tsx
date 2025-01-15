import { BestCar } from "@/entities/recommendation/api/types";
import styled from "styled-components";
import { ReactComponent as CrownIcon } from "public/icons/crown.svg";
type Props = {
  data: BestCar;
};
export function ComparisonCard({ data }: Props) {
  console.log(data);
  return (
    <Container>
      <ImgWrap>
        <img src={data.mainImage} />
      </ImgWrap>
      <Row>
        <StyledIcon />
        <Description>
          <h6>최초 등록일</h6>
          <p>dd</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description>
          <h6>최초 등록일</h6>
          <p>dd</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description>
          <h6>주행 거리</h6>
          <p>dd</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description>
          <h6>연비</h6>
          <p>dd</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description>
          <h6>사고 이력</h6>
          <p>dd</p>
        </Description>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 10px 0 20px 0;
  background-color: var(--navy);
`;
const ImgWrap = styled.div`
  img {
    width: 100%;
    height: 125px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
const Row = styled.div`
  padding: 15px 24px;
  display: flex;
  align-items: end;
  gap: 5px;

  h6 {
    color: var(--dark-gray);
    font-size: var(--semi-bold--md);
  }
`;
const StyledIcon = styled(CrownIcon)``;
const Description = styled.div`
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  p {
    color: var(--white);
    font-size: var(--semi-bold--md);
    font-weight: 600;
  }
`;
