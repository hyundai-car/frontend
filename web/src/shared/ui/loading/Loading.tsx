import styled from "styled-components";
import { Icon } from "../Icon/Icon";
import { forwardRef } from "react";

// ref는 기본적으로 옵셔널
// 사용예제 <Loading isLoading={isFetchingNextPage} ref={ref} />
export const Loading = forwardRef<
  HTMLDivElement,
  { isLoading?: boolean; iconSize?: number }
>(({ isLoading = true, iconSize = 40 }, ref) => {
  return (
    <LoadMoreTrigger ref={ref}>
      {isLoading && <Icon type="loading" size={iconSize} color="navy" />}
    </LoadMoreTrigger>
  );
});

const LoadMoreTrigger = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
