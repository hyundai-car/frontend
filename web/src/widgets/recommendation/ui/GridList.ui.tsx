import { GridItem } from "@/entities/recommendation/ui/GridItem";
import { useBestCarQuery } from "@/entities/recommendation/model/queries";
import styled from "styled-components";
import { ReactComponent as CashIcon } from "public/icons/cash.svg";
import { ReactComponent as BrushIcon } from "public/icons/brush.svg";
import { ReactComponent as CalendarIcon } from "public/icons/calendar.svg";
import { ReactComponent as CarIcon } from "public/icons/car.svg";
import { ReactComponent as DrivingIcon } from "public/icons/driving.svg";
import { ReactComponent as GasStationIcon } from "public/icons/gasStation.svg";
import { ReactComponent as groupIcon } from "public/icons/group.svg";
import { ReactComponent as RoutingIcon } from "public/icons/routing.svg";
import { ReactComponent as ProfileIcon } from "public/icons/profile.svg";
import { compareWithAvg } from "@/widgets/recommendation/model/actions";

export function GridList() {
  // const { data } = useBestCar() as { data: BestCarResponse };
  const { data } = useBestCarQuery();
  const bestCar = data?.bestCar;
  const comparisonAvg = data?.comparisonAvg;

  if (!bestCar || !comparisonAvg) {
    return <div>Loading...</div>;
  }

  // comparisions에서의 값과 bestCar에서의 값 비교해서 color 넣어주기
  const result = compareWithAvg(bestCar, comparisonAvg);

  return (
    <Container>
      <GridItem
        itemName="가성비점수"
        Icon={CashIcon}
        color={result.mmScore ? "white" : "black"}
        backColor={result.mmScore ? "blue" : "white"}
        value={Math.round(bestCar?.mmScore)}
      />
      <GridItem
        itemName="사고이력"
        Icon={DrivingIcon}
        color={result.accidentCount ? "white" : "black"}
        backColor={result.accidentCount ? "blue" : "white"}
        value={bestCar?.accidentCount}
      />
      <GridItem
        itemName="최초등록일"
        Icon={CalendarIcon}
        color={result.initialRegistrationDate ? "white" : "black"}
        backColor={result.initialRegistrationDate ? "blue" : "white"}
        value={bestCar?.initialRegistrationDate}
      />
      <GridItem
        itemName="연비"
        Icon={groupIcon}
        color={result.fuelEfficiency ? "white" : "black"}
        backColor={result.fuelEfficiency ? "blue" : "white"}
        value={bestCar?.fuelEfficiency}
      />
      <GridItem
        itemName="주행거리"
        Icon={RoutingIcon}
        color={result.mileage ? "white" : "black"}
        backColor={result.mileage ? "blue" : "white"}
        value={bestCar?.mileage}
      />
      <GridItem
        itemName="번호판"
        Icon={CarIcon}
        color="black"
        backColor="white"
        value={bestCar?.carNumber}
      />
      <GridItem
        itemName="차량색상"
        Icon={BrushIcon}
        color="black"
        backColor="white"
        value={bestCar?.exteriorColor}
      />
      <GridItem
        itemName="연료타입"
        Icon={GasStationIcon}
        color="black"
        backColor="white"
        value={bestCar?.fuelType}
      />
      <GridItem
        itemName="승차인원"
        Icon={ProfileIcon}
        color="black"
        backColor="white"
        value={bestCar?.seating}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;
