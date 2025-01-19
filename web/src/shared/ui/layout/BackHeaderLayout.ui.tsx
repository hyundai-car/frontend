/**
 * @description header(뒤로가기 버튼)이 있는 레이아웃
 */
import { Icon } from "@/shared/ui/Icon/Icon";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

export function BackHeaderLayout() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Icon type="back" color={"black"} onClick={() => navigate(-1)} />
      </Header>

      <Outlet />
    </Container>
  );
}

const Container = styled.div``;
const Header = styled.div`
  height: 64px;
  background-color: var(--white);

  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
