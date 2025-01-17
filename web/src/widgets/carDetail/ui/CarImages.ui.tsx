import Car360Image from "@/entities/carDetail/ui/Car360Image.ui";
import { ClickCarImgList } from "@/features/carDetail/ui/ClickCarImgList.ui";
import { carImages } from "@/widgets/carDetail/model/mock";
import styled from "styled-components";
export function CarImages() {
  return (
    <Container>
      <Car360Image images={carImages} numImages={36} />
      <Wrap>
        <ClickCarImgList />
      </Wrap>
    </Container>
  );
}

const Container = styled.div``;
const Wrap = styled.div`
  padding: 20px 0;
`;
