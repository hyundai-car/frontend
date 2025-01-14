import { useBestCar } from "@/pages/recommendation/model/queries";
import { ItemName } from "@/widgets/recommendation/model/types";
import { FC, SVGProps } from "react";
import styled, { DefaultTheme } from "styled-components";
// itemName, icon, 해당정보

type Props = {
  itemName: ItemName;
  Icon: FC<SVGProps<SVGSVGElement>>; // SVG 컴포넌트를 받는 타입
  color: keyof DefaultTheme["colors"];
};
type StyledIconProps = {
  component: FC<SVGProps<SVGSVGElement>>;
  $color: keyof DefaultTheme["colors"];
};

export function ResultItem({ itemName, Icon, color }: Props) {
  return (
    <Container>
      <IconWrap>
        <StyledIcon component={Icon} $color={color} />
        <h2>{itemName}</h2>
      </IconWrap>
      <Description></Description>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--blue);
  width: 90px;
  height: 104px;
  border-radius: 8px;
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

// const StyledIcon = styled(({ Icon, ...props }: StyledIconProps) => (
//   <Icon {...props} />
// ))<{ $color: Props["color"] }>`
//   path,
//   rect,
//   circle,
//   line {
//     // SVG에서 사용될 수 있는 모든 요소 지정

//     stroke: ${({ theme, $color }) => String(theme.colors[$color])} !important;
//     stroke-width: 1.5;
//     stroke-linecap: round;
//     stroke-linejoin: round;
//   }
// `;

const IconWrap = styled.div``;
const Description = styled.div``;
