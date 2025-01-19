import { Icon } from "@/shared/ui/Icon/Icon";
import styled from "styled-components";
// import { mockCarListData } from "../api/mockCarListData";
import { convertToManWon } from "../../../shared/lib/priceUtils";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
// import { ISimpleResultCarInfo } from "@/entities/simpleSearch/model/types";
import { IBaseCar, ISearchCar } from "../model/types";

type Props = {
  data?: IBaseCar | ISearchCar;
  actionSlot?: ReactNode;
};
export function StackedCard({ data, actionSlot }: Props) {
  const navigate = useNavigate();
  if (!data) {
    throw new Error("Data is undefined");
  }
  const {
    carName,
    initialRegistration,
    mileage,
    sellingPrice,
    mainImage,
    likeCount,
  } = data;

  const price = convertToManWon(sellingPrice).toLocaleString();

  return (
    <Card onClick={() => navigate(`/cars/carsDetail?carNo=${data.carId}`)}>
      <ImageContainer>
        {"isLike" in data && actionSlot && (
          <HeartButton>{actionSlot}</HeartButton>
        )}
        <CardImage src={mainImage} alt="Card image" />
      </ImageContainer>
      <ContentContainer>
        <TitleRow>
          <Title>{carName}</Title>
          <LikeCount>
            <span>{likeCount}</span>
            <Icon type="heart-circle" size={20} color="blue" readonly />
          </LikeCount>
        </TitleRow>

        <Divider />

        <Footer>
          <InfoGroup>
            <InfoItem>
              <Icon type="date" size={12} color="deepDarkGray" readonly />
              <span>{initialRegistration}</span>
            </InfoItem>
            <InfoItem>
              <Icon type="routing" size={12} color="deepDarkGray" readonly />
              <span>{mileage.toLocaleString()}KM</span>
            </InfoItem>
          </InfoGroup>
          <PriceWrap>
            <Price>{sellingPrice.toLocaleString()}</Price>만원
          </PriceWrap>
        </Footer>
      </ContentContainer>
    </Card>
  );
}

const Card = styled.div`
  cursor: pointer;
  max-width: 400px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: var(--box-shadow);
`;

const ImageContainer = styled.div`
  position: relative;
`;

const HeartButton = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  border: none;
  background-color: transparent;
`;

const CardImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ContentContainer = styled.div`
  padding: 11px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: var(--semi-bold--md);
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
  width: 250px;
`;

const LikeCount = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: var(--dark-gray);
  font-size: var(--semi-bold--md);
  font-weight: 600;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 8px 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: var(--semi-bold--xs);
`;

const PriceWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--semi-bold--md);
  font-weight: 600;
  color: #1f2937;
`;
const Price = styled.span`
  font-weight: bold;
  color: var(--blue);
  font-size: var(--semi-bold--md-small);
`;
