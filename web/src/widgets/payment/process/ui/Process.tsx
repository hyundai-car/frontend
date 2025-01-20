import { PaymentForm } from "@/features/payments/ui/PaymentForm/PaymentForm";
import styled from "styled-components";
import { PaymentHeader } from "../../header/ui/Header";
import { PaymentButton } from "@/features/payments/ui/PaymentButton/PaymentButton";
import { useNavigate, useParams } from "react-router-dom";
import { showModal } from "@/shared/hooks/useModal";
import { usePaymentStore } from "@/entities/payments/contractInfo/model/store";
import {
  usePaymentBalanceMutation,
  usePaymentDepositMutation,
} from "@/features/payments/api/payments.query";
import { useEffect, useState } from "react";
import { handleLoading } from "../../util/load";
import { Icon } from "@/shared/ui/Icon/Icon";

export function ProcessWidget() {
  const navigate = useNavigate();
  const { carId, type } = useParams();
  const isDeposit = type === "deposit";
  const { price } = usePaymentStore();
  const [total, setTotal] = useState(price);

  const header = isDeposit ? "계약" : "잔금 결제";
  const uiPrice = 300000;
  const { mutate: payDeposit } = usePaymentDepositMutation();
  const { mutate: payBalance } = usePaymentBalanceMutation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(price);
    setTotal(price * 10000 + 45000);
  }, [usePaymentStore]);

  const handlePayment = () => {
    if (isDeposit) {
      showModal({
        title: "결제하시겠어요?",
        subTitle: "계약금을 결제하시겠습니까?",
        buttonLabel: "확인",
        buttonColor: "blue",
        // onConfirm: () => {
        //   // 확인 버튼
        //   // api 연결
        //   payDeposit(Number(carId), {
        //     onSuccess: () => {
        //       console.log("계약금 결제 성공");
        //     },
        //     onError: (error) => {
        //       console.error("계약금 결제 실패:", error);
        //     },
        //   });
        //   navigate(`/payments/${carId}/deposit/process/complete`);
        // },
        onConfirm: () =>
          handleLoading(async () => {
            payDeposit(Number(carId), {
              onSuccess: () => {
                console.log("계약금 결제 성공");
              },
              onError: (error) => {
                console.error("계약금 결제 실패:", error);
              },
            });
            navigate(`/payments/${carId}/deposit/process/complete`);
          }, setIsLoading),
      });
    } else {
      // 잔금결제
      showModal({
        title: "결제하시겠어요?",
        subTitle: "잔금을 결제하시겠습니까?",
        buttonLabel: "확인",
        buttonColor: "blue",
        onConfirm: () =>
          handleLoading(async () => {
            payBalance(Number(carId), {
              onSuccess: () => {
                console.log("계약금 결제 성공");
              },
              onError: (error) => {
                console.error("계약금 결제 실패:", error);
              },
            });
            navigate(`/payments/${carId}/balance/process/complete`);
          }, setIsLoading),
      });
    }
  };

  return (
    <>
      <PaymentHeader text={header} />
      <Container>
        <Wrap>
          <InfoRow>
            <Title>{isDeposit ? "계약" : "결제"} 금액</Title>
            <Price>
              {isDeposit
                ? uiPrice.toLocaleString()
                : (total - 300000).toLocaleString()}{" "}
              원
            </Price>
          </InfoRow>
          <Title>결제카드 정보 입력</Title>
          <Desc>차량 계약자 명의의 신용카드 외 결제 불가</Desc>
        </Wrap>
        <PaymentForm />
      </Container>
      <PaymentButton text="결제하기" onClick={handlePayment} />
      {isLoading && (
        <LoadingContainer>
          <Icon type="loading" size={100} color="white" />
        </LoadingContainer>
      )}
    </>
  );
}

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding-bottom: 30px;
`;

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
