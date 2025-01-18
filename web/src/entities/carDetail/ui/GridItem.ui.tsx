import { ValueOf } from "@/shared/model/utils";
import { ItemName } from "@/widgets/recommendation/model/types";
import { Basic } from "@/shared/model/car.types";
import { FC, SVGProps } from "react";
import styled, { DefaultTheme } from "styled-components";

type Props = {
  itemName: ItemName;
  Icon: FC<SVGProps<SVGSVGElement>>; // SVG 컴포넌트를 받는 타입
  color?: keyof DefaultTheme["colors"];
  backColor?: keyof DefaultTheme["colors"];
  value: ValueOf<Basic>;
};
type StyledIconProps = {
  component: FC<SVGProps<SVGSVGElement>>;
  $color?: keyof DefaultTheme["colors"];
  $backColor?: keyof DefaultTheme["colors"];
};

export function GridItem({
  itemName,
  Icon,
  color = "black",
  backColor = "white",
  value,
}: Props) {
  return (
    <Container $backColor={backColor}>
      <IconWrap>
        <StyledIcon component={Icon} $color={color} $backColor={backColor} />
        <h2>{itemName}</h2>
      </IconWrap>
      <Description $color={color}>{value}</Description>
    </Container>
  );
}

const Container = styled.div<{ $backColor: keyof DefaultTheme["colors"] }>`
  background-color: ${({ $backColor }) => `var(--${String($backColor)})`};
  width: 100%;
  height: 104px;
  border-radius: 8px;
  padding: 11px;
`;

// SVG 컴포넌트의 모든 요소에 색상 적용
const StyledIcon = styled(({ component: Icon, ...props }: StyledIconProps) => (
  <Icon {...props} width={20} height={20} />
))<{ $color: keyof DefaultTheme["colors"] }>`
  path,
  rect,
  circle,
  line,
  polyline,
  polygon {
    stroke: ${({ $color }) => `var(--${String($color)})`};
  }
`;

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  h2 {
    font-size: var(--regular--sm);
    color: var(--dark-gray);
  }
`;
const Description = styled.h1<{ $color: keyof DefaultTheme["colors"] }>`
  color: ${({ $color }) => `var(--${String($color)})`};
  font-size: var(--semi-bold--md);
  font-weight: 600;
  padding-top: 6.5px;
  line-height: 17px;
`;
