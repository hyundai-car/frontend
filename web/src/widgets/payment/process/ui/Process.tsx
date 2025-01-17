import { PaymentForm } from "@/features/payments/ui/PaymentForm/PaymentForm";
import styled from "styled-components";
import { PaymentHeader } from "../../header/ui/Header";
import { PaymentButton } from "@/features/payments/ui/PaymentButton/PaymentButton";
import { useNavigate, useParams } from "react-router-dom";
import { showModal } from "@/shared/hooks/useModal";

export function ProcessWidget() {
  const navigate = useNavigate();
  const { carId, type } = useParams();
  const header = type === "deposit" ? "계약" : "잔금 결제";
  const price = type === "deposit" ? "30,0000" : "결제금액";

  const handlePayment = () => {
    if (type === "deposit") {
      showModal({
        title: "결제하시겠어요?",
        subTitle: "계약금을 결제하시겠습니까?",
        buttonLabel: "확인",
        buttonColor: "blue",
        onConfirm: () => {
          // 폼 입력 검증
          navigate(`/payments/${carId}/deposit/process/complete`);
        },
      });
    } else {
      // 잔금결제
      showModal({
        title: "결제하시겠어요?",
        subTitle: "잔금을 결제하시겠습니까?",
        buttonLabel: "확인",
        buttonColor: "blue",
        onConfirm: () => {
          // 폼 입력 검증
          navigate(`/payments/${carId}/balance/process/complete`);
        },
      });
    }
  };
  return (
    <>
      <PaymentHeader text={header} />
      <Container>
        <Wrap>
          <InfoRow>
            <Title>결제 금액</Title>
            <Price>{price} 원</Price>
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
