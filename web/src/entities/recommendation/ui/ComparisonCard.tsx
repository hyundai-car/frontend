import styled from "styled-components";
import { ReactComponent as CrownIcon } from "public/icons/crown.svg";
import { CarDetailResponse } from "@/shared/api/api.types";
import { Comparison } from "@/shared/model/car.types";
import { useEffect, useState } from "react";
import { FUEL_TYPE_MAPPING } from "@/shared/model/constant";

type Props = {
  data: CarDetailResponse;
  isBest: boolean;
  comparedData?: Comparison;
};
type ComparisonResult = {
  [K in keyof Comparison]: boolean;
};

export function ComparisonCard({ data, isBest, comparedData }: Props) {
  const [comparison, setComparison] = useState<ComparisonResult>();

  useEffect(() => {
    if (!comparedData) return;

    const comparisonResult: ComparisonResult = {
      mmScore: data.car.mmScore > comparedData.mmScore,
      accidentCount: data.car.accidentCount < comparedData.accidentCount,
      initialRegistration:
        data.car.initialRegistration > comparedData.initialRegistration,
      fuelEfficiency: data.car.fuelEfficiency > comparedData.fuelEfficiency,
      mileage: data.car.mileage > comparedData.mileage,
    };

    setComparison(comparisonResult);
  }, [data, comparedData]);

  return (
    <Container $isBest={isBest}>
      <ImgWrap>
        <img src={data.car.mainImage} />
      </ImgWrap>
      <Row>
        <StyledIcon $isBest={isBest} $isSuperior={comparison?.mmScore} />
        <Description $isBest={isBest} $isSuperior={comparison?.mmScore}>
          <h6>가성비 점수</h6>
          <p>{Math.ceil(data.car.mmScore)}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon $isBest={isBest} $isSuperior={comparison?.accidentCount} />
        <Description $isBest={isBest} $isSuperior={comparison?.accidentCount}>
          <h6>사고 이력</h6>
          <p>{data.car.accidentCount} 회</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon $isBest={isBest} $isSuperior={comparison?.mileage} />
        <Description $isBest={isBest} $isSuperior={comparison?.mileage}>
          <h6>연비</h6>
          <p>{data.car.mileage}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon $isBest={isBest} $isSuperior={comparison?.fuelEfficiency} />
        <Description $isBest={isBest} $isSuperior={comparison?.fuelEfficiency}>
          <h6>주행 거리</h6>
          <p>{Math.ceil(data.car.fuelEfficiency)} km</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon $isBest={isBest} />
        <Description $isBest={isBest}>
          <h6>번호판</h6>
          <p>{data.car.carNumber}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon $isBest={isBest} />
        <Description $isBest={isBest}>
          <h6>차량색상</h6>
          <p>{data.car.exteriorColor}</p>
        </Description>
      </Row>
      <Row>
        <StyledIcon $isBest={isBest} />
        <Description $isBest={isBest}>
          <h6>연료타입</h6>
          <p>
            {
              FUEL_TYPE_MAPPING[
                data.car.fuelType as keyof typeof FUEL_TYPE_MAPPING
              ]
            }
          </p>
        </Description>
      </Row>
      <Row>
        <StyledIcon $isBest={isBest} />
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
const StyledIcon = styled(CrownIcon)<{
  $isBest: boolean;
  $isSuperior?: boolean;
}>`
  padding-bottom: 8px;
  path {
    fill: ${({ $isBest, $isSuperior }) => {
      if ($isBest && $isSuperior) return "var(--blue)";
      if ($isBest) return "";
      return "var(--light-gray)";
    }};
  }
`;

const Description = styled.div<{ $isBest: boolean; $isSuperior?: boolean }>`
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  line-height: 1.3;

  p {
    /* color: var(--white); */
    /* color: ${({ $isBest }) => ($isBest ? "var(--white)" : "var(--navy)")}; */
    color: ${({ $isBest, $isSuperior }) => {
      if ($isBest && $isSuperior) return "var(--blue)";
      if ($isBest) return "var(--white)";
      return "var(--navy)";
    }};

    font-size: var(--semi-bold--md-small);
    font-weight: 600;

    display: -webkit-box; /* Flexbox와 비슷한 박스 모델 */
    -webkit-line-clamp: 1; /* 최대 2줄까지만 표시 */
    -webkit-box-orient: vertical; /* 수직 방향으로 정렬 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임표 추가 */
    word-break: break-word; /* 단어를 줄 바꿈 */
  }
`;
