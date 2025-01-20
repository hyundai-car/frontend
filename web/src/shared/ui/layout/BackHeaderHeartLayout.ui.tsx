/**
 * @description header(뒤로가기/좋아요 버튼)이 있는 레이아웃
 */

import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as HeartIcon } from "public/icons/heart.svg";
import { Icon } from "@/shared/ui/Icon/Icon";
import { useEffect, useState } from "react";
import { getHeartApi, postHeartApi } from "@/shared/api/api";

export function BackHeaderHeartLayout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const carId = Number(searchParams.get("carNo"));
  const [isFilledHeart, setIsFilledHeart] = useState(false);

  useEffect(() => {
    getHeartApi(carId).then((data) => {
      setIsFilledHeart(data.isLike);
    });
  }, [carId]);

  const handleHeartBtn = () => {
    setIsFilledHeart((prev) => !prev);
    postHeartApi(carId).then((data) => {
      setIsFilledHeart(data.isLike);
    });
  };

  return (
    <Container>
      <Header>
        <Icon type="back" color={"white"} onClick={() => navigate(-1)} />
        <StyledIcon
          $isFilled={isFilledHeart}
          as={HeartIcon}
          onClick={handleHeartBtn}
        />
      </Header>

      <Outlet />
    </Container>
  );
}

const Container = styled.div``;
const Header = styled.div`
  position: fixed;
  width: 100%;
  box-shadow: var(--box-shadow);
  height: 64px;
  background-color: var(--navy);

  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 10;
`;
const StyledIcon = styled.svg<{ $isFilled: boolean }>`
  path {
    fill: ${(props) => (props.$isFilled ? "var(--white)" : "none")};
    stroke: ${(props) =>
      props.$isFilled ? "none" : "var(--white)"}; /* 비어있을 때 흰색 테두리 */
  }
`;
