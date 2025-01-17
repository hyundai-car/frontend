import { BasicButton } from "@/shared/ui/button";

interface Props {
  text: string;
  onClick: () => void;
}
export function PaymentButton({ text, onClick }: Props) {
  return (
    <Bottom>
      <BasicButton color="blue" onClick={onClick}>
        {text}
      </BasicButton>
    </Bottom>
  );
}
import styled from "styled-components";
const Bottom = styled.div`
  position: fixed;
  bottom: 20px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
