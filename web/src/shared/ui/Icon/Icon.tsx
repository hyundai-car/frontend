import styled, { css, DefaultTheme } from 'styled-components';

// 아이콘 타입 정의
export type IconType =
  | 'calendar'
  | 'heart-circle'
  | 'heart'
  | 'routing'
  | 'search';

// Props 타입 정의
export interface IconProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  type: IconType;
  color?: keyof DefaultTheme["colors"];
  size?: number;
}

const IconWrapper = styled.div<{ $isClickable: boolean, $size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => `${props.$size}px`};
  height: ${props => `${props.$size}px`};
  flex-shrink: 0;
  
  ${props => props.$isClickable && css`
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  `}
`;

const IconImage = styled.div<{ 
  type: IconType;
  $color?: keyof DefaultTheme['colors'];
}>`
  width: 100%;
  height: 100%;
  ${props => props.$color ? css`
    // color prop이 있을 때만 mask 적용
    mask-image: ${`url("/icons/${props.type}.svg")`};
    mask-size: contain;
    mask-position: center;
    mask-repeat: no-repeat;
    background-color: ${props.theme.colors[props.$color]};
  ` : css`
    // color prop이 없을 때는 일반 background-image 사용
    background-image: ${`url("/icons/${props.type}.svg")`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `}
`;
export function Icon({ className, onClick, type, color, size = 24 }: IconProps) {
  return (
    <IconWrapper 
      className={className}
      onClick={onClick}
      $isClickable={Boolean(onClick)}
      $size={size}
    >
      <IconImage type={type} $color={color} />
    </IconWrapper>
  );
}

// 사용 예시:
// <Icon type="heart" size={24} />
// <Icon type="heart" size={24} color="primary" />
// <Icon 
//   type="search" 
//   size={32}
//   onClick={() => console.log('clicked')} 
// />