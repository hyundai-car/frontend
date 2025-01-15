import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";
import styled from "styled-components";

export function BaseLayout() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(pathKeys.search());
  };

  return (
    <Container>
      <Header>
        <Logo 
          src="/images/logo.svg" 
          alt="로고" 
          onClick={() => navigate('/')}
        />
        <SearchButton onClick={handleSearchClick}>
          <img src="/icons/search.svg" alt="검색" />
        </SearchButton>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 20px;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 62px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  // 임시선
  border-bottom: 1px solid #eee;
  z-index: 100;
`;

const Logo = styled.img`
  height: 15px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;

  &:active {
    opacity: 0.7;
  }
`;

const Main = styled.main`
  flex: 1;
  margin-top: 62px;
`;