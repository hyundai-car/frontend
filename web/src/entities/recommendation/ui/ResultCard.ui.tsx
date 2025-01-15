import { useBestCar } from "@/pages/recommendation/model/queries";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  // bestCar: bestCar;
  // comparison: Comparison;
  topSlot: ReactNode;
  bottomSlot: ReactNode;
};

export function ResultCard({ topSlot, bottomSlot }: Props) {
  const { data } = useBestCar();
  const { bestCar, comparisons } = data;

  return (
    <Container>
      <HeaderSection>
        <h1>{bestCar.modelName}</h1>
        <p>선택 차량 평균과 추천차량의 데이터를 비교해드릴게요</p>
      </HeaderSection>
      <MainSection>{topSlot}</MainSection>

      <FooterSection>{bottomSlot}</FooterSection>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--navy);
  border-radius: 8px;
  padding: 39px 34px;
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
const MainSection = styled.section``;
const FooterSection = styled.section``;
