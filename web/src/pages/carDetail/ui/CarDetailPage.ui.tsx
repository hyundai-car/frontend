import { useCarDetailQuery } from "@/pages/carDetail/model/queries";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "public/icons/calendar.svg";
import { ReactComponent as MileageIcon } from "public/icons/routing.svg";
import { BasicInfoCard } from "@/entities/carDetail";
import { OptionInfo } from "@/entities/carDetail/ui/OptionInfo.ui";
import { CarImages } from "@/widgets/carDetail/ui/CarImages.ui";
import { useSearchParams } from "react-router-dom";
import { SaveCarDetailStore } from "@/pages/carDetail/model/actions";

export function CarDetailPage() {
  const [searchParams] = useSearchParams();
  const carId = Number(searchParams.get("carNo"));

  const { data } = useCarDetailQuery(carId);
  SaveCarDetailStore(data, carId);

  if (!data) return <div>데이터를 찾을 수 없습니다</div>;

  const { carName, initialRegistration, mileage, sellingPrice } = data.car;

  return (
    <Container>
      <ImageSection>
        <CarImages />
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
        <BasicInfoCard />
      </CardSection>

      <CardSection>
        <OptionInfo />
      </CardSection>
    </Container>
  );
}

const Container = styled.div``;
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
