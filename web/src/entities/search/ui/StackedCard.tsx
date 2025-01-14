import { Icon } from '@/shared/ui/Icon/Icon';
import styled from 'styled-components';
// data
const imageSrc = "https://certified-static.hyundai.com/contents/goods/shootConts/tobepic/02/exterior/HIG241028009973/PRD602_233.JPG/dims/crop/2304x1536+600+770/resize/560x373/optimize"
const title = "2022 그랜저(IG) 하이브리드 르블랑"
const likes = 275
const date = "21년 07월"
const dist = "16,510KM"
const price = "3,390"

export function StackedCard() {

    return (
    <Card>
      <ImageContainer>
          <HeartButton>
            <Icon type="heart" onClick={() => console.log('clicked')} />
        </HeartButton>
        <CardImage 
            src={ imageSrc}
          alt="Card image" 
        />
      </ImageContainer>
      
      <ContentContainer>
        <TitleRow>
            <Title>{ title}</Title>
          <LikeCount>
              <span>{likes}</span>
              <Icon type="heart-circle" size={20} color="blue" onClick={() => console.log('clicked')} />
          </LikeCount>
        </TitleRow>

        <Divider />

        <Footer>
          <InfoGroup>
            <InfoItem>
              <Icon type="calendar" size={12} color="deepDarkGray" readonly />
                <span>{ date}</span>
            </InfoItem>
            <InfoItem>
              <Icon type="routing" size={12} color="deepDarkGray" readonly />
                <span>{ dist}</span>
            </InfoItem>
            </InfoGroup>
            <PriceWrap>

            <Price>{ price}</Price>만원
            </PriceWrap>
        </Footer>
      </ContentContainer>
    </Card>
  );
}
const Card = styled.div`
  background-color: rgba(255, 200, 0, 0.3);
  max-width: 400px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
   background-color: red;
`;

const Title = styled.h3`
  font-size: var(--semi-bold--md);
  font-style: normal;
  font-weight: 600;
  line-height: 17px;
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
  background-color: black;
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

