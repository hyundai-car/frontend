import Car360Image from "@/entities/carDetail/ui/Car360Image.ui";
import { carImages } from "@/widgets/carDetail/model/mock";
import styled from "styled-components";
export function CarImages() {
  return (
    <Container>
      <Car360Image images={carImages} numImages={36} />
    </Container>
  );
}

const Container = styled.div``;
