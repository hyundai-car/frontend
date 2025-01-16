import { useCarDetailQuery } from "@/pages/carDetail/model/queries";
import styled from "styled-components";

export function CarDetailPage() {
  const { cars } = useCarDetailQuery(); //TODO 나중에 carId 넘겨주기

  return (
    <Container>
      <Description>
        <h1></h1>
      </Description>
    </Container>
  );
}

const Container = styled.div``;
const Description = styled.div``;
