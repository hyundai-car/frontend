import { Graph } from "@/entities/carDetail/ui/graph.ui";
import { GridList } from "@/widgets/delivery/ui/GridList.ui";
import styled from "styled-components";

export function BasicInfoCard() {
  //   const { data } = useCarDetailQuery();
  //   if (!data) return null;

  //   const {
  //     mmScore,
  //     initialRegistrationDate,
  //     fuelEfficiency,
  //     mileage,
  //     carNumber,
  //     exteriorColor,
  //     fuelType,
  //     seating,
  //   } = data.cars;

  return (
    <Container>
      <HeaderSection>
        <h1>기본정보</h1>
      </HeaderSection>
      <Graph />
      <GridList />
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--navy);
  width: 100%;
  padding: 39px 34px;
`;
const HeaderSection = styled.div`
  h1 {
    color: var(--white);
    font-size: var(--semi-bold--lg);
    font-weight: 600;
  }
`;
