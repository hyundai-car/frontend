import { Icon } from "@/shared/ui/Icon/Icon";
import { Outlet, useNavigate } from "react-router-dom";

export function PaymentLayout() {
  const navigate = useNavigate();
  return (
    <div>
      <Header>
        <BackButton>
          <Icon
            type="back"
            onClick={() => {
              navigate(-1);
            }}
          />
        </BackButton>
        <Step>계약</Step>
      </Header>
      <Outlet />
      <div style={{ backgroundColor: "lightpink" }}>bottom button</div>
    </div>
  );
}

import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 16px;
  border-bottom: 2px solid var(--light-gray, #f7f7f7);
`;

const BackButton = styled.div`
  position: absolute;
  left: 16px;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 700;
`;
