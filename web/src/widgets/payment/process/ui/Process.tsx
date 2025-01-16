import { PaymentForm } from "@/features/payments/ui/PaymentForm/PaymentForm";
import styled from "styled-components";
import { PaymentHeader } from "../../header/ui/Header";
import { PaymentButton } from "@/features/payments/ui/PaymentButton/PaymentButton";
import { useNavigate, useParams } from "react-router-dom";

export function ProcessWidget() {
  const navigate = useNavigate();
  const { carId, type } = useParams();
  const header = type === "deposit" ? "계약" : "잔금 결제";

  const handlePayment = () => {
    // 모달 추가, 폼 입력 검증 추가
    if (type === "deposit") {
      navigate(`/payments/${carId}/deposit/process/complete`);
    } else {
      navigate(`/payments/${carId}/balance/process/complete`);
    }
  };
  return (
    <>
      <PaymentHeader text={header} />
      <Container>
        <Wrap>
          <InfoRow>
            <Title>주문 금액</Title>
            <Price>300,000 원</Price>
          </InfoRow>
          <Title>결제카드 정보 입력</Title>
          <Desc>차량 계약자 명의의 신용카드 외 결제 불가</Desc>
        </Wrap>
        <PaymentForm />
      </Container>
      <PaymentButton text="결제하기" onClick={handlePayment} />
    </>
  );
}

const Container = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0 20px;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 17px 0;
  background-color: #fff;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 20px 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;
const Price = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: var(--blue);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const Desc = styled.div`
  font-size: 13px;
  color: #a5a5a5;
`;
