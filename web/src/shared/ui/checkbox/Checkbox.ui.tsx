import React from "react";
import styled from "styled-components";
import { ReactComponent as CheckIcon } from "./checkbox.svg";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  return (
    <Container disabled={disabled}>
      <CheckboxContainer>
        <HiddenCheckbox
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <StyledCheckIcon $checked={checked} />
      </CheckboxContainer>
      {label && <Label disabled={disabled}>{label}</Label>}
    </Container>
  );
};

const Container = styled.label<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckIcon = styled(CheckIcon)<{ $checked: boolean }>`
  path {
    fill: ${(props) => (props.$checked ? "var(--blue)" : "var(--gray-blue)")};
  }
`;

const Label = styled.span<{ disabled: boolean }>`
  margin-left: 8px;
`;
