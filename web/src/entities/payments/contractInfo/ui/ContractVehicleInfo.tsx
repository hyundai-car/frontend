import styled from "styled-components";
import { Icon } from "@/shared/ui/Icon/Icon";
// import { mockContractInfoData } from "../api/mock";
// import { convertToManWon } from "@/shared/lib/priceUtils";
import { usePaymentsCarInfoQuery } from "@/features/payments/api/carInfo.query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePaymentStore } from "../model/store";

export function ContractVehicleInfo() {
  const { carId } = useParams<{ carId: string }>();
  // const { car } = mockContractInfoData;
  // const { modelName, year, mileage, price, mainImage } = car;
  const setPrice = usePaymentStore((state) => state.setPrice);
  const { data } = usePaymentsCarInfoQuery(carId ? +carId : 0);

  useEffect(() => {
    setPrice(data?.sellingPrice || 0);
    console.log("차량 가격:", data?.sellingPrice);
  }, [data]);

  console.log("차량 상세 정보:", data);

  const {
    carName = "",
    initialRegistration = "",
    mileage = 0,
    sellingPrice = 0,
    mainImage = "",
  } = data || {};

  // const formatPrice = convertToManWon(sellingPrice).toLocaleString();

  return (
    <Container>
      <Title>차량 정보</Title>
      <CarInfoBox>
        <CarImage src={mainImage} alt={carName} />
        <CarDetails>
          <div>
            <CarName>{carName}</CarName>
            <InfoRow>
              <InfoItem>
                <Icon type="date" size={12} color="darkGray" />
                <Desc>{initialRegistration}</Desc>
              </InfoItem>
              <InfoItem>
                <Icon type="routing" size={12} color="darkGray" />
                <Desc>{mileage}km</Desc>
              </InfoItem>
            </InfoRow>
          </div>
          <Price>{sellingPrice.toLocaleString()} 만원</Price>
        </CarDetails>
      </CarInfoBox>
      <Detail>*부대비용이 포함되어 있지 않은 차량 가격입니다.</Detail>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 30px 20px;
  background-color: var(--navy);
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
`;

const CarInfoBox = styled.div`
  display: flex;
  gap: 10px;
`;

const CarImage = styled.img`
  width: 100px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
`;

const CarDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 4px;
  // background-color: yellow;
  height: 80px;
`;

const CarName = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Desc = styled.div`
  color: var(--dark-gray);
  font-size: 10px;
`;
const Price = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #b6b5ff;
  text-align: right;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
`;
const Detail = styled.div`
  font-size: 9px;
  color: #c9c9c9;
  margin-top: 15px;
`;
