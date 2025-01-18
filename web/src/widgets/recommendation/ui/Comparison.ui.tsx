import { ComparisonCard } from "@/entities/recommendation/ui/ComparisonCard";
import { CarDetailResponse } from "@/shared/api/api.types";
import { SelectBox } from "@/shared/ui/selectbox";
import { useRecommendationResult } from "@/widgets/recommendation/model/actions";
// import { MOCK_ComparisonList } from "@/widgets/recommendation/model/mock";
import {
  useCarDetailQuery,
  useCarDetailsQueries,
} from "@/widgets/recommendation/model/queries";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

export function Comparision() {
  //TODO 훅으로 빼기

  const { bestCarId, otherCarIds } = useRecommendationResult();
  const [selectedCarId, setSelectedCarId] = useState<number>();

  const { data: bestCarDetail } = useCarDetailQuery(bestCarId);
  const carQueries = useCarDetailsQueries(otherCarIds);

  // carQueries의 데이터로 comparedCarDetails 생성
  const comparedCarDetails = useMemo(() => {
    const map: Record<number, CarDetailResponse> = {};

    carQueries.forEach((query, index) => {
      if (query.data && otherCarIds?.[index]) {
        map[otherCarIds[index]] = query.data;
      }
    });
    return map;
  }, [carQueries, otherCarIds]);

  // SelectBox options 생성
  const options = useMemo(
    () =>
      otherCarIds?.map((id: number) => ({
        value: id,
        label: comparedCarDetails[id]?.car.carName,
      })) ?? [],
    [otherCarIds, comparedCarDetails]
  );

  // 초기 선택 차량 설정
  useEffect(() => {
    if (otherCarIds?.length && !selectedCarId) {
      setSelectedCarId(otherCarIds[0]);
    }
  }, [otherCarIds, selectedCarId]);

  // 비교에서 선택된 차량의 정보 가져오기
  const selectedItemCarInfo = useMemo(() => {
    return Object.values(comparedCarDetails).find(
      (car: CarDetailResponse) => selectedCarId === car.car.carId
    );
  }, [comparedCarDetails, selectedCarId]);

  return (
    <Container>
      <Title>
        자세히 <br /> 비교해볼까요?
      </Title>
      <SectionWrap>
        <Section>
          <Header>추천차량</Header>
          {bestCarDetail && (
            <ComparisonCard data={bestCarDetail} isBest={true} />
          )}
        </Section>
        <Section>
          <SelectBox
            options={options}
            value={selectedCarId}
            onChange={setSelectedCarId}
            placeholder="전체평균"
          />
          {selectedItemCarInfo && (
            <ComparisonCard data={selectedItemCarInfo} isBest={false} />
          )}
        </Section>
      </SectionWrap>
    </Container>
  );
}

const Container = styled.div``;
const Title = styled.div`
  font-size: var(--semi-bold--xxl);
  line-height: normal;
  font-weight: 600;
`;
const SectionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Header = styled.div`
  width: 100%;
  min-width: 150px;

  height: 31px;
  border-radius: 8px;
  border: 1px solid var(--black);
  text-align: center;
  line-height: 31px;
  font-size: var(--regular--md);
`;
