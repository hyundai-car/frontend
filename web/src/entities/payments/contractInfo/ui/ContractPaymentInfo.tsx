import { mockContractInfoData } from "../api/mock";
const { carPrice } = mockContractInfoData.paymentInfo;

export function ContractPaymentInfo() {
  const total = carPrice + 20000 + 25000;
  return (
    <Container>
      <Title>주문 금액</Title>
      <Wrap>
        <InfoRow>
          <Label>차량 주문 금액</Label>
          <Value>{carPrice.toLocaleString()} 원</Value>
        </InfoRow>
        <InfoRow>
          <Label>탁송료</Label>
          <Value>20,000 원</Value>
        </InfoRow>
        <InfoRow>
          <Label>관리비</Label>
          <Value>25,000 원</Value>
        </InfoRow>
        <InfoRow>
          <TotalLabel>총 주문 금액</TotalLabel>
          <Total>{total.toLocaleString()} 원</Total>
        </InfoRow>
      </Wrap>
    </Container>
  );
}
import styled from "styled-components";

const Container = styled.div`
  padding: 17px 0;
`;

const Title = styled.div`
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 20px;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  color: #666;
  font-size: 13px;
`;

const Value = styled.div`
  font-size: 14px;
  font-weight: 500;
`;
const TotalLabel = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: var(--blue);
`;

const Total = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: var(--blue);
`;
