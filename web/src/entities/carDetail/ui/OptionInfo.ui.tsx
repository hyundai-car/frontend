import { OptionInfoList } from "@/widgets/carDetail/ui/OptionInfoList.ui";
import { DebugWrapper } from "@/widgets/DebugToggle";
import styled from "styled-components";

export function OptionInfo() {
  return (
    <Container>
      <HeaderSection>
        <h1>옵션정보</h1>
        <DebugWrapper layerName="widgets/OptionInfoList">
          <OptionInfoList />
        </DebugWrapper>
      </HeaderSection>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 39px 34px;
`;
const HeaderSection = styled.div`
  h1 {
    font-size: var(--semi-bold--lg);
    font-weight: 600;
    padding-bottom: 20px;
  }
`;
