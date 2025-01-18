import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingFallback = () => {
  return (
    <Container>
      <LogoContainer>
        <StyledLogo>
          <img src="/images/logo3.png" />
        </StyledLogo>
      </LogoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: var(--navy);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  img {
    object-fit: cover;
  }
`;
