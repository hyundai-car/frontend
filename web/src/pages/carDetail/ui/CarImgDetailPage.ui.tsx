import { MOCK_CarImgList } from "@/features/carDetail/model/mock";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "public/icons/close.svg";
export function CarImgDetailPage() {
  const imgUrls: string[] = MOCK_CarImgList.contents.map(
    ({ imageUrl }) => imageUrl
  );
  return (
    <Container>
      <CloseBtn>
        <StyledIcon as={CloseIcon} />
      </CloseBtn>
      {imgUrls.map((imgUrl, index) => {
        return (
          <ImgWrap key={index}>
            <img src={imgUrl} />
          </ImgWrap>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ImgWrap = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const CloseBtn = styled.button`
  right: 20px;
  top: 20px;
  position: absolute;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  fill: #fff;
  border-radius: 50%;
  box-shadow: var(--list-item);
  border: none;
`;

const StyledIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
