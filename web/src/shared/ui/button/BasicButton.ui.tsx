import styled from "styled-components";
import { DefaultTheme } from "styled-components";

interface BasicButtonProps {
  onClick: () => void;
  color?: keyof DefaultTheme["colors"];
  disabled?: boolean;
  children: React.ReactNode;
}

export const BasicButton = ({
  onClick,
  children,
  color = "blue",
  disabled = false,
}: BasicButtonProps) => {
  return (
    <StyledButton $color={color} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $color: keyof DefaultTheme["colors"];
}>`
  width: 100%;
  height: 50px;
  color: var(--white);
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors[props.$color]};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
  outline: none;
  font-size: var(--semi-bold--md);
  font-weight: 600;
  box-shadow: var(--box-shadow);
`;
