import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import styled from "styled-components";

export function BaseLayout() {
  const navigate = useNavigate();

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
  padding: 0 20px;
`;

