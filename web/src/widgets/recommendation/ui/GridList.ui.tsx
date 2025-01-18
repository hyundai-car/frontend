import { GridItem } from "@/entities/recommendation/ui/GridItem";
// import { useBestCarQuery } from "@/entities/recommendation/model/queries";
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
import {
  compareWithAvg,
  useRecommendationResult,
} from "@/widgets/recommendation/model/actions";

export function GridList() {
  const { bestCar, comparisons } = useRecommendationResult();
  const ComparedResult = compareWithAvg(bestCar, comparisons);

  return (
    <Container>
      <GridItem
        itemName="가성비점수"
        Icon={CashIcon}
        color={ComparedResult.mmScore ? "white" : "black"}
        backColor={ComparedResult.mmScore ? "blue" : "white"}
        value={Math.round(bestCar.mmScore)}
      />
      <GridItem
        itemName="사고이력"
        Icon={DrivingIcon}
        color={ComparedResult.accidentCount ? "white" : "black"}
        backColor={ComparedResult.accidentCount ? "blue" : "white"}
        value={bestCar.accidentCount}
      />
      <GridItem
        itemName="최초등록일"
        Icon={CalendarIcon}
        color={ComparedResult.initialRegistration ? "white" : "black"}
        backColor={ComparedResult.initialRegistration ? "blue" : "white"}
        value={bestCar.initialRegistration}
      />
      <GridItem
        itemName="연비"
        Icon={groupIcon}
        color={ComparedResult.fuelEfficiency ? "white" : "black"}
        backColor={ComparedResult.fuelEfficiency ? "blue" : "white"}
        value={Math.round(bestCar.fuelEfficiency)}
      />
      <GridItem
        itemName="주행거리"
        Icon={RoutingIcon}
        color={ComparedResult.mileage ? "white" : "black"}
        backColor={ComparedResult.mileage ? "blue" : "white"}
        value={bestCar.mileage}
      />
      <GridItem
        itemName="번호판"
        Icon={CarIcon}
        color="black"
        backColor="white"
        value={bestCar.carNumber}
      />
      <GridItem
        itemName="차량색상"
        Icon={BrushIcon}
        color="black"
        backColor="white"
        value={bestCar.exteriorColor}
      />
      <GridItem
        itemName="연료타입"
        Icon={GasStationIcon}
        color="black"
        backColor="white"
        value={bestCar.fuelType}
      />
      <GridItem
        itemName="승차인원"
        Icon={ProfileIcon}
        color="black"
        backColor="white"
        value={bestCar.seating}
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
