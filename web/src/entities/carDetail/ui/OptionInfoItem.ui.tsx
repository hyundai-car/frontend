import styled from "styled-components";
import { ItemName } from "@/entities/carDetail/model/types";
import { ValueOf } from "@/shared/model/utils";
import { Option } from "@/shared/model/car.types";

type Props = {
  itemName: ItemName;
  iconImg: string;
  hasOption: ValueOf<Option>;
};
export function OptionInfoItem({ itemName, iconImg, hasOption }: Props) {
  return (
    <Screen $hasOption={hasOption}>
      <Container>
        <ImgWrap>
          <img src={iconImg} />
        </ImgWrap>
        <p>{itemName}</p>
      </Container>
    </Screen>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  p {
    font-size: var(--regular--md);
    text-align: center;
    line-height: 1.2;
    /* word-break: keep-all;  */
    word-wrap: break-word; /* 긴 단어의 경우 줄바꿈 */
  }
`;
const Screen = styled.div<{ $hasOption: ValueOf<OptionList> }>`
  position: relative;
  z-index: 1;
  opacity: ${({ $hasOption }) => (!$hasOption ? "0.3" : "1")};
`;

const ImgWrap = styled.div`
  img {
    width: 50px;
    height: 50px;
  }
`;
