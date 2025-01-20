import Car360Image from "@/entities/carDetail/ui/Car360Image.ui";
import { ClickCarImgList } from "@/features/carDetail/ui/ClickCarImgList.ui";
import { useCar360ImagesQuery } from "@/pages/carDetail/model/queries";
import { LoadingFallback } from "@/shared/ui/fallback/LoadingFallback";
import { DebugWrapper } from "@/widgets/DebugToggle";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export function CarImages() {
  const [searchParams] = useSearchParams();
  const carId = Number(searchParams.get("carNo"));

  const {
    data: carImages,
    isLoading,
    isError,
    error,
  } = useCar360ImagesQuery(carId);

  // 로딩 상태 처리
  if (isLoading) {
    return <LoadingFallback />;
  }

  // 에러 상태 처리
  if (isError) {
    return <Message>Failed to load car images: {String(error)}</Message>;
  }

  // 데이터가 없을 경우 처리
  if (!carImages || carImages.length === 0) {
    return <Message>No car images available.</Message>;
  }

  return (
    <Container>
      <DebugWrapper layerName="entities/Car360Image">
        <Car360Image images={carImages} numImages={36} />
      </DebugWrapper>
      <Wrap>
        <DebugWrapper layerName="features/ClickCarImgList">
          <ClickCarImgList />
        </DebugWrapper>
      </Wrap>
    </Container>
  );
}

const Container = styled.div``;

const Wrap = styled.div`
  padding: 20px 0;
`;

const Message = styled.div`
  font-size: 18px;
  text-align: center;
  padding: 20px;
  color: #555;
`;
