import { MOCK_CarImgList } from "@/features/carDetail/model/mock";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

export function ClickCarImgList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const carId = Number(searchParams.get("carNo"));
  const imgUrls: string[] = MOCK_CarImgList.contents.map(
    ({ imageUrl }) => imageUrl
  );

  const handleButton = () => {
    navigate(`/cars/carsDetail/images?carNo=${carId}`);
  };

  return (
    <ButtonWrap onClick={handleButton}>
      <Container>
        <ImgWrap>
          <img src={imgUrls[0]} />
        </ImgWrap>
        <ImgWrap>
          <img src={imgUrls[2]} />
        </ImgWrap>
        <ImgWrap>
          <img src={imgUrls[4]} />
        </ImgWrap>
        <Screen>
          <OverlayText>34+</OverlayText>
          <ImgWrap>
            <img src={imgUrls[3]} />
          </ImgWrap>
        </Screen>
      </Container>
    </ButtonWrap>
  );
}

const ButtonWrap = styled.button`
  width: 100%;
  border: none;
  background-color: var(--white);
`;
const Container = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ImgWrap = styled.div`
  img {
    width: 70px;
    height: 60px;
    border-radius: 8px;
    box-shadow: var(--box-shadow);
  }
`;

const Screen = styled.div`
  position: relative;
  width: 70px;
  height: 60px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
  }
`;

const OverlayText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: var(--semi-bold--md-small);
  font-weight: 700;
  text-align: center;
  z-index: 2;
  margin: 0;
`;
