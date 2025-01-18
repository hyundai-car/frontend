import { GridItem } from "@/entities/carDetail/ui/GridItem.ui";
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
import { useCarDetailStore } from "@/pages/carDetail/model/store";

export function GridList() {
  const { carBasicData } = useCarDetailStore();
  if (!carBasicData) {
    return null;
  }

  const {
    mmScore,
    initialRegistration,
    accidentCount,
    fuelEfficiency,
    mileage,
    carNumber,
    exteriorColor,
    fuelType,
    seating,
  } = carBasicData;

  return (
    <Container>
      <GridItem
        itemName="가성비점수"
        Icon={CashIcon}
        value={Math.ceil(mmScore)}
      />
      <GridItem itemName="사고이력" Icon={DrivingIcon} value={accidentCount} />
      <GridItem
        itemName="최초등록일"
        Icon={CalendarIcon}
        value={initialRegistration}
      />
      <GridItem itemName="연비" Icon={groupIcon} value={fuelEfficiency} />
      <GridItem itemName="주행거리" Icon={RoutingIcon} value={mileage} />
      <GridItem itemName="번호판" Icon={CarIcon} value={carNumber} />
      <GridItem itemName="차량색상" Icon={BrushIcon} value={exteriorColor} />
      <GridItem itemName="연료타입" Icon={GasStationIcon} value={fuelType} />
      <GridItem itemName="승차인원" Icon={ProfileIcon} value={seating} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;
