import { useBestCarQuery } from "@/entities/recommendation/model/queries";
import { ComparisonCard } from "@/entities/recommendation/ui/ComparisonCard";
import styled from "styled-components";

export function Comparision() {
  const { data } = useBestCarQuery();
  const bestCar = data?.bestCar;

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
          <ComparisonCard data={bestCar} />
        </Section>
        <Section>
          <Header>전체평균</Header>
          <ComparisonCard data={bestCar} />
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
  /* width: 150px; */
  width: 100%;
  height: 31px;
  border-radius: 8px;
  border: 1px solid var(--black);
  text-align: center;
  line-height: 31px;
  font-size: var(--regular--md);
`;
