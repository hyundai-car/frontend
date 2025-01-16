import { mockContractInfoData } from "../api/mock";
const { name, email, phoneNumber } = mockContractInfoData.customer;

export function ContractOrderInfo() {
  return (
    <Container>
      <Title>주문자 정보</Title>
      <InfoRow>
        <Label>이름</Label>
        <Value>{name}</Value>
      </InfoRow>
      <InfoRow>
        <Label>이메일</Label>
        <Value>{email}</Value>
      </InfoRow>
      <InfoRow>
        <Label>휴대폰 번호</Label>
        <Value>{phoneNumber}</Value>
      </InfoRow>
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
  margin-bottom: 16px;
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
  font-size: 14px;
`;

const Value = styled.div`
  font-size: 14px;
  font-weight: 500;
`;
