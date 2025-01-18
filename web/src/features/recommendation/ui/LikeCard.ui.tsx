import { SelectCard } from "@/features/recommendation/model/types";
import { formatNumber } from "@/shared/utils/format.utils";
import { Checkbox } from "@/shared/ui/checkbox/Checkbox.ui";
import styled from "styled-components";

type Props = {
  item: SelectCard;
  checked: boolean;
  onChange: () => void;
};

export function LikeCard({ item, checked, onChange }: Props) {
  return (
    <Container>
      <Wrap>
        <Checkbox checked={checked} onChange={onChange} />

        <Section>
          <LeftSection>
            <CarImg src={item.mainImage} alt="carMainImage" />
          </LeftSection>

          <RightSection>
            <h1>{item.modelName}</h1>
            <div>
              <span>{item.year}</span>{" "}
              <span>{formatNumber(item.mileage)}km</span>
            </div>
            <h1>{formatNumber(item.mileage)} 만원</h1>
          </RightSection>
        </Section>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  height: 91px;
  box-shadow: var(--list-item);
  padding: 7px 10px;
  border-radius: 8px;
`;

const Wrap = styled.div`
  display: flex;
  gap: 10px;
`;
const Section = styled.div`
  display: flex;
  gap: 15px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h1 {
    font-size: var(--semi-bold--md);
    font-weight: 600;
    line-height: 1.2;

    display: -webkit-box; /* Flexbox와 비슷한 박스 모델 */
    -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
    -webkit-box-orient: vertical; /* 수직 방향으로 정렬 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* 말줄임표 추가 */
    word-break: break-word; /* 단어를 줄 바꿈 */
  }

  span {
    font-size: var(--regular--sm);
    font-weight: 400;
  }
`;

const CarImg = styled.img`
  width: 77px;
  height: 77px;
  border-radius: 8px;
`;
const LeftSection = styled.div``;
