import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export function BaseLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px 20px; // 테스트용
`;
