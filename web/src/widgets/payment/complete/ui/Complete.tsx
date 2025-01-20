import styled, { keyframes } from "styled-components";
import { PaymentButton } from "@/features/payments/ui/PaymentButton/PaymentButton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePaymentStore } from "@/entities/payments/contractInfo/model/store";

export function CompleteWidget() {
  const { type } = useParams();
  const [showContent, setShowContent] = useState(false);
  const { setPrice } = usePaymentStore();
  const text = type === "deposit" ? "계약금 결제 완료" : "결제 완료";
  const subText =
    type === "deposit"
      ? "해당 차량 담당자로부터 연락이 올 예정입니다."
      : "탁송 서비스가 시작될 예정입니다.";

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handlePayment = () => {
    // 확인 버튼 클릭 시 마이페이지로 이동, jsj
    if (type !== "deposit") {
      setPrice(0);
    }
  };
  return (
    <>
      <Container>
        <ContentWrapper $show={showContent}>
          <CheckmarkWrapper>
            <CheckmarkCircle>
              <Checkmark />
            </CheckmarkCircle>
          </CheckmarkWrapper>
          <TextContent>
            <Title>{text}</Title>
            <SubTitle>{subText}</SubTitle>
          </TextContent>
        </ContentWrapper>
      </Container>
      <PaymentButton text="확인" onClick={handlePayment} />
    </>
  );
}

const Container = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContentWrapper = styled.div<{ $show: boolean }>`
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-play-state: ${(props) => (props.$show ? "running" : "paused")};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40vh;
  margin-top: 100px;
`;

const checkmarkCircleAnimation = keyframes`
  from {
    stroke-dashoffset: 166;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const checkmarkAnimation = keyframes`
  from {
    stroke-dashoffset: 66;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const CheckmarkWrapper = styled.div`
  margin-bottom: 24px;
`;
const CheckmarkCircle = styled.div`
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 50px;
    height: 50px;
  }

  .circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #2196f3;
    fill: none;
    animation: ${checkmarkCircleAnimation} 0.6s cubic-bezier(0.4, 0, 0.2, 1)
      forwards;
  }

  .check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    stroke-width: 3;
    stroke: #2196f3;
    fill: none;
    animation: ${checkmarkAnimation} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.4s;
  }
`;

const Checkmark = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="#5662F6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="circle-check"
      d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
    />
  </svg>
);

const TextContent = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #333;
  margin: 0 0 12px 0;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
`;
