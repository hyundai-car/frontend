import styled from "styled-components";
import { ReactComponent as CloseIcon } from "public/icons/close.svg";
import { useGetImgListQuery } from "@/pages/carDetail/model/queries";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImgList } from "@/pages/carDetail/api/types";

export function CarImgDetailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const carId = Number(searchParams.get("carNo"));
  const { data } = useGetImgListQuery(carId);

  const imgUrls: string[] =
    data?.contents.map((content: ImgList) => content.imageUrl) ?? [];

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <CloseBtn onClick={goBack}>
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
