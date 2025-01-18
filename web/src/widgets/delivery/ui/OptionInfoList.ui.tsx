import { OptionInfoItem } from "@/entities/carDetail/ui/OptionInfoItem.ui";
import { useCarDetailQuery } from "@/pages/carDetail/model/queries";
import styled from "styled-components";

export function OptionInfoList() {
  const { data } = useCarDetailQuery();
  if (!data) return null;
  //   const { optionList } = data.optionLists;

  return (
    <Container>
      <OptionInfoItem
        itemName="내비게이션"
        iconImg="/images/option_navi.png"
        hasOption={data.optionLists.hasNavigation}
      />
      <OptionInfoItem
        itemName="하이패스"
        iconImg="/images/option_hipass.png"
        hasOption={data.optionLists.hasNavigation}
      />
      <OptionInfoItem
        itemName="열선 스티어링 휠"
        iconImg="/images/option_hotline.png"
        hasOption={data.optionLists.hasNavigation}
      />
      <OptionInfoItem
        itemName="열선시트"
        iconImg="/images/option_hotseat.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="통풍시트"
        iconImg="/images/option_windseat.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="전동시트"
        iconImg="/images/option_transmissionseat.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="가죽시트"
        iconImg="/images/option_leatherseat.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="전동식 트렁크"
        iconImg="/images/option_trunk.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="선루프"
        iconImg="/images/option_sun.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="헤드업 디스플레이"
        iconImg="/images/option_headup.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="서라운드 뷰 모니터"
        iconImg="/images/option_surround.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="후방 모니터"
        iconImg="/images/option_backmonitor.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="후측방 경보 시스템"
        iconImg="/images/option_backalarm.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="차선 이탈 경보"
        iconImg="/images/option_carlinealarm.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="스마트 크루즈 컨트롤"
        iconImg="/images/option_smartcontrol.png"
        hasOption={false}
      />
      <OptionInfoItem
        itemName="전방 주차거리"
        iconImg="/images/option_frontpark.png"
        hasOption={false}
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
