import { getCar360ImagesApi } from "@/entities/carDetail/api/Car360Image.api";
import Car360Image from "@/entities/carDetail/ui/Car360Image.ui";
import { ClickCarImgList } from "@/features/carDetail/ui/ClickCarImgList.ui";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
export function CarImages() {

  const [searchParams] = useSearchParams();
  const carId = Number(searchParams.get("carNo"));
  const carImages = getCar360ImagesApi(carId);
  console.log(carImages)

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
