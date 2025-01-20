import { rotate, shine } from "@/entities/recommendation/model/constants";
import { useRecommendationResult } from "@/widgets/recommendation/model/actions";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  topSlot: ReactNode;
  bottomSlot: ReactNode;
};

export function RecommendationCard({ topSlot, bottomSlot }: Props) {
  const { bestCar } = useRecommendationResult();

  return (
    <Container>
      <Card>
        <CardFront>
          <HeaderSection>
            <h1>{bestCar.carName}</h1>
            <p>선택 차량 평균과 추천차량의 데이터를 비교해드릴게요</p>
          </HeaderSection>
          <MainSection>{topSlot}</MainSection>

          <FooterSection>{bottomSlot}</FooterSection>
        </CardFront>

        <CardBack>
          <StyledLogo>
            <img src="/images/logo2.png" />
          </StyledLogo>
        </CardBack>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  /* padding: 39px 34px; */

  perspective: 1000px; // 3D
  height: 780px;
  position: relative;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: ${rotate} 1.5s linear;
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: var(--navy);
  border-radius: 8px;
  padding: 39px 34px;

  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    animation: ${shine} 4s infinite;
    z-index: 1;
  }
`;

const CardFront = styled(CardSide)``;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  h1 {
    color: var(--white);
    font-size: var(--semi-bold--lg);

    display: -webkit-box; /* Flexbox와 비슷한 박스 모델 */
    -webkit-line-clamp: 1; /* 최대 2줄까지만 표시 */
    -webkit-box-orient: vertical; /* 수직 방향으로 정렬 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임표 추가 */
    word-break: break-word; /* 단어를 줄 바꿈 */
  }
  p {
    color: var(--dark-gray);
    font-size: var(--regular--sm);
  }
`;
const StyledLogo = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  img {
    object-fit: cover;
  }
`;
const MainSection = styled.section``;
const FooterSection = styled.section``;
