import { useCarDetailQuery } from "@/pages/carDetail/model/queries";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "public/icons/calendar.svg";
import { ReactComponent as MileageIcon } from "public/icons/routing.svg";
import { BasicInfoCard } from "@/entities/carDetail";
import { OptionInfo } from "@/entities/carDetail/ui/OptionInfo.ui";
import { CarImages } from "@/widgets/carDetail/ui/CarImages.ui";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSaveCarDetailStore } from "@/pages/carDetail/model/actions";
import { LoadingFallback } from "@/shared/ui/fallback/LoadingFallback";
import { BasicButton } from "@/shared/ui/button";
import { useEffect } from "react";
import { DebugWrapper } from "@/widgets/DebugToggle";

export function CarDetailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const carId = Number(searchParams.get("carNo"));

  const { data } = useCarDetailQuery(carId);

  useSaveCarDetailStore(data, carId);

  // 컴포넌트 마운트 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) return <LoadingFallback />;

  const { carName, initialRegistration, mileage, sellingPrice } = data.car;

  return (
    <DebugWrapper layerName="pages/RecommendationPage">
      <Container>
        <ImageSection>
          <DebugWrapper layerName="widgets/CarImages">
            <CarImages />
          </DebugWrapper>
        </ImageSection>

        <TitleSection>
          <h2>{carName}</h2>
          <OptionWrap>
            <Option>
              <StyledIcon as={CalendarIcon} />
              <p>{initialRegistration}</p>
            </Option>
            <Option>
              <StyledIcon as={MileageIcon} />
              <p>{mileage}</p>
            </Option>
          </OptionWrap>
          <h1>
            <strong>{sellingPrice}</strong> 만원
          </h1>
        </TitleSection>

        <CardSection>
          <DebugWrapper layerName="entities/carDetail">
            <BasicInfoCard />
          </DebugWrapper>
        </CardSection>

        <CardSection>
          <DebugWrapper layerName="entities/OptionInfo">
            <OptionInfo />
          </DebugWrapper>
        </CardSection>

        <ButtonWrap>
          <DebugWrapper layerName="shared/BasicButton">
            <BasicButton
              onClick={() => {
                navigate(`/payments/${carId}/contract-info`);
              }}
            >
              구매하기
            </BasicButton>
          </DebugWrapper>
        </ButtonWrap>
      </Container>
    </DebugWrapper>
  );
}

const Container = styled.div`
  padding-top: 64px;
  padding-bottom: 80px;
`;
const ImageSection = styled.div``;
const TitleSection = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  h1 {
    padding-top: 5px;
    font-size: var(--semi-bold--xxl);
    font-weight: 700;
    align-self: flex-end;

    strong {
      color: var(--blue);
    }
  }
  h2 {
    font-size: var(--semi-bold--lg);
    font-weight: 600;
    line-height: 1.3;
  }
`;
const OptionWrap = styled.div`
  display: flex;
  gap: 10px;
`;
const Option = styled.div`
  display: flex;
  align-items: center;
  p {
    color: var(--dark-gray);
  }
`;
const StyledIcon = styled.svg`
  path,
  rect,
  circle,
  line,
  polyline,
  polygon {
    stroke: var(--dark-gray);
  }
`;

const CardSection = styled.div`
  padding-top: 30px;
`;

const ButtonWrap = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px;
  background-color: var(--white);
  border-radius: 8px;
`;
