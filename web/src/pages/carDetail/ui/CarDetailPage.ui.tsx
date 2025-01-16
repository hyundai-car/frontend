import { useCarDetailQuery } from "@/pages/carDetail/model/queries";
import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "public/icons/calendar.svg";
import { ReactComponent as MileageIcon } from "public/icons/routing.svg";
import { BasicInfoCard } from "@/entities/carDetail";
import { OptionInfo } from "@/entities/carDetail/ui/OptionInfo.ui";
export function CarDetailPage() {
  const { data } = useCarDetailQuery(); //TODO 나중에 carId 넘겨주기
  if (!data) return null;
  const { carName, year, mileage, sellingPrice } = data.cars;
  // const basicInfo = FormatBasicInfo(data);

  return (
    <Container>
      <TitleSection>
        <h2>{carName}</h2>
        <OptionWrap>
          <Option>
            <StyledIcon as={CalendarIcon} />
            <p>{year}</p>
          </Option>
          <Option>
            <StyledIcon as={MileageIcon} />
            <p>{mileage}</p>
          </Option>
        </OptionWrap>
        {/* TODO 만원 뺴서 계산하기 */}
        <h1>
          <strong>{sellingPrice}</strong> 만원
        </h1>
      </TitleSection>
      {/* <BasicInfoCard basicData={basicInfo} /> */}

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
const TitleSection = styled.div`
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
