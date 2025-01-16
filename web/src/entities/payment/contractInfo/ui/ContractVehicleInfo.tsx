import styled from "styled-components";
import { Icon } from "@/shared/ui/Icon/Icon";
import { mockContractInfoData } from "../api/mock";

export function ContractVehicleInfo() {
  const { car } = mockContractInfoData;
  const { modelName, year, mileage, price, mainImage } = car;

  const formattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price);

  const formattedMileage = new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(mileage);

  return (
    <Container>
      <Title>차량 정보</Title>
      <CarInfoBox>
        <CarImage src={mainImage} alt={modelName} />
        <CarDetails>
          <CarName>{modelName}</CarName>
          <InfoRow>
            <InfoItem>
              <Icon type="date" size={16} color="darkGray" />
              <span>{year}</span>
            </InfoItem>
            <InfoItem>
              <Icon type="routing" size={16} color="darkGray" />
              <span>{formattedMileage}km</span>
            </InfoItem>
          </InfoRow>
        </CarDetails>
      </CarInfoBox>
    </Container>
  );
}
const Container = styled.div`
  padding: 30px 0;
  background-color: #1a1f27; // 네이비 배경
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
`;

const CarInfoBox = styled.div`
  display: flex;
  gap: 10px;
`;

const CarImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 4px;
  object-fit: cover;
`;

const CarDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;

const CarName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #8b5cf6; // 보라색
  margin-bottom: 12px;
  text-align: right;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #9ca3af; // 회색
  font-size: 14px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
