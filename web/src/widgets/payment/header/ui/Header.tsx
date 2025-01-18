import { Icon } from "@/shared/ui/Icon/Icon";
import { useNavigate } from "react-router-dom";

export function PaymentHeader({ text }: { text: string }) {
  const navigate = useNavigate();
  return (
    <Header>
      <BackButton>
        <Icon
          type="back"
          onClick={() => {
            navigate(-1);
          }}
        />
      </BackButton>
      <Step>{text}</Step>
    </Header>
  );
}

import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 16px 0;
  border-bottom: 2px solid var(--light-gray, #f7f7f7);
`;

const BackButton = styled.div`
  position: absolute;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 700;
`;
