import { OptionInfoItem } from "@/entities/carDetail/ui/OptionInfoItem.ui";
import { useCarDetailQuery } from "@/pages/carDetail/model/queries";
import { useCarDetailStore } from "@/pages/carDetail/model/store";
import styled from "styled-components";

export function OptionInfoList() {
  const { carOptionData } = useCarDetailStore();
  if (!carOptionData) return null;
  //   const { optionList } = data.optionLists;

  return (
    <Container>
      <OptionInfoItem
        itemName="내비게이션"
        iconImg="/images/option_navi.png"
        hasOption={carOptionData.hasNavigation}
      />
      <OptionInfoItem
        itemName="하이패스"
        iconImg="/images/option_hipass.png"
        hasOption={carOptionData.hasHiPass}
      />
      <OptionInfoItem
        itemName="열선 스티어링 휠"
        iconImg="/images/option_hotline.png"
        hasOption={carOptionData.hasHeatedSteeringWheel}
      />
      <OptionInfoItem
        itemName="열선시트"
        iconImg="/images/option_hotseat.png"
        hasOption={carOptionData.hasHeatedSeats}
      />
      <OptionInfoItem
        itemName="통풍시트"
        iconImg="/images/option_windseat.png"
        hasOption={carOptionData.hasVentilatedFrontSeats}
      />
      <OptionInfoItem
        itemName="전동시트"
        iconImg="/images/option_transmissionseat.png"
        hasOption={carOptionData.hasPowerFrontSeats}
      />
      <OptionInfoItem
        itemName="가죽시트"
        iconImg="/images/option_leatherseat.png"
        hasOption={carOptionData.isLeatherSeats}
      />
      <OptionInfoItem
        itemName="전동식 트렁크"
        iconImg="/images/option_trunk.png"
        hasOption={carOptionData.hasPowerTrunk}
      />
      <OptionInfoItem
        itemName="선루프"
        iconImg="/images/option_sun.png"
        hasOption={carOptionData.hasSunroof}
      />
      <OptionInfoItem
        itemName="헤드업 디스플레이"
        iconImg="/images/option_headup.png"
        hasOption={carOptionData.hasHeadUpDisplay}
      />
      <OptionInfoItem
        itemName="서라운드 뷰 모니터"
        iconImg="/images/option_surround.png"
        hasOption={carOptionData.hasSurroundViewMonitor}
      />
      <OptionInfoItem
        itemName="후방 모니터"
        iconImg="/images/option_backmonitor.png"
        hasOption={carOptionData.hasRearViewMonitor}
      />
      <OptionInfoItem
        itemName="후측방 경보 시스템"
        iconImg="/images/option_backalarm.png"
        hasOption={carOptionData.hasBlindSpotWarning}
      />
      <OptionInfoItem
        itemName="차선 이탈 경보"
        iconImg="/images/option_carlinealarm.png"
        hasOption={carOptionData.hasLaneDepartureWarning}
      />
      <OptionInfoItem
        itemName="스마트 크루즈 컨트롤"
        iconImg="/images/option_smartcontrol.png"
        hasOption={carOptionData.hasSmartCruiseControl}
      />
      <OptionInfoItem
        itemName="전방 주차거리"
        iconImg="/images/option_frontpark.png"
        hasOption={carOptionData.hasFrontParkingSensors}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;
