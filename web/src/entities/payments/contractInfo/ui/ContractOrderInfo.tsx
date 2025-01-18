import { getLocalStorageValue } from "@/shared/util/localStorage";
// import { mockContractInfoData } from "../api/mock";
// const { name, email, phoneNumber } = mockContractInfoData.customer;

export function ContractOrderInfo() {
  const userInfo = JSON.parse(getLocalStorageValue("userInfo") || "{}");
  const { name, email, phoneNumber } = userInfo;
  return (
    <Container>
      <Title>주문자 정보</Title>
      <Wrap>
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
  font-size: 13px;
  font-weight: 400;
`;
