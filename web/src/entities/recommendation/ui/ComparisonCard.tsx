import styled from "styled-components";
import { ReactComponent as CrownIcon } from "public/icons/crown.svg";
import { CarDetailResponse } from "@/shared/api/api.types";

export function ComparisonCard({
  data,
  isBest,
}: {
  // data: Props | BestCar;
  data: CarDetailResponse;
  isBest: boolean;
}) {
  console.log(data);

  return (
    <Container $isBest={isBest}>
      <ImgWrap>
        <img src={data.car.mainImage} />
      </ImgWrap>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>가성비 점수</h6>
          <p>{data.car.initialRegistration}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>사고 이력</h6>
          <p>{data.car.accidentCount}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>연비</h6>
          <p>{data.car.mileage}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>주행 거리</h6>
          <p>{Math.ceil(data.car.fuelEfficiency)}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>번호판</h6>
          <p>{data.car.carNumber}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>차량색상</h6>
          <p>{data.car.exteriorColor}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>연료타입</h6>
          <p>{data.car.fuelType}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon />
        <Description $isBest={isBest}>
          <h6>승차인원</h6>
          <p>{data.car.seating}</p>
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
  line-height: 1.3;
  /* white-space: nowrap; 텍스트를 한 줄로 제한 */
  /* overflow: hidden; 넘치는 텍스트를 숨김 */
  /* text-overflow: ellipsis; 넘친 부분에 ... 표시 */
  p {
    color: var(--white);
    color: ${({ $isBest }) => ($isBest ? "var(--white)" : "var(--navy)")};
    font-size: var(--semi-bold--md-small);
    font-weight: 600;
  }
`;
