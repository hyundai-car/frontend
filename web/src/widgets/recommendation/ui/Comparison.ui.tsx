import { useBestCarQuery } from "@/entities/recommendation/model/queries";
import { ComparisonCard } from "@/entities/recommendation/ui/ComparisonCard";
import { SelectBox } from "@/shared/ui/selectbox";
import { MOCK_ComparisonList } from "@/widgets/recommendation/model/mock";
import { useMemo, useState } from "react";
import styled from "styled-components";

export function Comparision() {
  const { data } = useBestCarQuery();
  const bestCar = data?.bestCar;
  const [selectedCarId, setSelectedCarId] = useState<number | undefined>(
    undefined
  );

  const selectedItemCarInfo = useMemo(() => {
    return MOCK_ComparisonList.find((car) => selectedCarId === car.cardId);
  }, [selectedCarId]);

  //TODO
  const options = [
    { value: data?.otherCarIds[0] ?? 0, label: "레전드 울트라 빠른 차량" },
    { value: data?.otherCarIds[1] ?? 0, label: "진짜 미친듯이 예쁜 차량" },
    { value: data?.otherCarIds[2] ?? 0, label: "사랑에 빠질거 같은 차량" },
  ];

  if (!bestCar) {
    return <div>loading</div>;
  }

  return (
    <Container>
      <Title>
        자세히 <br /> 비교해볼까요?
      </Title>
      <SectionWrap>
        <Section>
          <Header>추천차량</Header>
          <ComparisonCard data={bestCar} isBest={true} />
        </Section>
        <Section>
          {/* <Header>전체평균</Header> */}
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
