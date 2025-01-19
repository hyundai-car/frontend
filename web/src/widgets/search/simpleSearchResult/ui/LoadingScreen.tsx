import styled, { keyframes } from "styled-components";
export function LoadingScreen() {
  return (
    <>
      <LoadingText>추천 차량을 찾고 있어요</LoadingText>
      <br />
      <LoadingDots>...</LoadingDots>
    </>
  );
}

const fadeInOut = keyframes`
 0% { opacity: 0.3; }
 50% { opacity: 1; }
 100% { opacity: 0.3; }
`;

const dotsAnimation = keyframes`
 0% { content: '.'; }
 33% { content: '..'; }
 66% { content: '...'; }
 100% { content: '.'; }
`;

const LoadingText = styled.span`
  background-color: var(--navy);
  width: 100%;
  color: var(--white);
  animation: ${fadeInOut} 2s infinite ease-in-out;
  display: inline-block;
`;

const LoadingDots = styled.span`
  &::after {
    content: "";
    animation: ${dotsAnimation} 1.5s infinite;
  }
`;
