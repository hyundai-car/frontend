import styled from "styled-components";
import { ReactComponent as CrownIcon } from "public/icons/crown.svg";
import { BestCar } from "@/entities/recommendation/api/types";

type Props = {
  cardId: number;
  modelName: string;
  initialRegistrationDate: string;
  mileage: number;
  year: number;
  price: number;
  mainImage: string;
};

export function ComparisonCard({
  data,
  isBest,
}: {
  data: Props | BestCar;
  isBest: boolean;
}) {
  console.log(data);

  return (
    <Container $isBest={isBest}>
      <ImgWrap>
        <img src={data.mainImage} />
      </ImgWrap>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>최초 등록일</h6>
          <p>{data.initialRegistrationDate}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>주행 거리</h6>
          <p>{data.mileage}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>연비</h6>
          <p>{data.mileage}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>연비</h6>
          <p>{data.mileage}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>연비</h6>
          <p>{data.mileage}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>연비</h6>
          <p>{data.mileage}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>연비</h6>
          <p>{data.mileage}</p>
        </Description>
      </Row>
    </Container>
  );
}

const Container = styled.div<{ $isBest: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 10px 0 20px 0;
  background-color: ${({ $isBest }) =>
    $isBest ? "var(--navy)" : "var(--light-gray)"};
  max-width: 160px;
  border: 1px solid var(--gray-blue);
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
  padding: 15px 18px;
  display: flex;
  align-items: end;
  gap: 5px;

  h6 {
    color: var(--dark-gray);
    font-size: var(--semi-bold--md);
  }
`;
const StyledIcon = styled(CrownIcon)``;
const Description = styled.div<{ $isBest: boolean }>`
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  p {
    color: var(--white);
    color: ${({ $isBest }) => ($isBest ? "var(--white)" : "var(--navy)")};
    font-size: var(--semi-bold--md-small);
    font-weight: 600;
  }
`;
