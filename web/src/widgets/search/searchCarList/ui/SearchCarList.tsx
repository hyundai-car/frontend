// import { useState, type ReactNode } from "react";
// import { mockCarListData } from "@/entities/search/api/mockCarListData";
import { StackedCard } from "@/entities/search";
import { WishlistButton } from "@/features/wishlist";
import { CarList } from "@/entities/search/carList/CarList";
import { useSearchCarListQuery } from "../api/searchCarList.query";
// type Props = {
//   actionSlot?: (carId: number) => ReactNode;
//   isFetching?: boolean;
// };

export const SearchCarList = () => {
  // 액션슬롯을 내려줘서 자식 컴포넌트의 특정부분을 부모에서 제어
  // const [carList] = useState(mockCarListData.contents);
  const { ref, inView } = useInView({
    rootMargin: "100px", // 하단 100px 전에 미리 로드 시작
  });
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchCarListQuery();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const getActionSlot = (carId: number) => <WishlistButton carId={carId} />;

  if (!isLoading && !data?.pages?.[0]?.contents?.length) {
    // 데이터가 없을 경우 메시지와 버튼 표시
    return (
      <Container>
        <Message>검색 결과가 없습니다.</Message>
      </Container>
    );
  }
  const allItems = data?.pages.flatMap((page) => page.contents) ?? [];

  return (
    <>
      <CarList
        items={allItems}
        isFetching={isLoading}
        getActionSlot={getActionSlot}
        renderItem={(data, actionSlot) => (
          <StackedCard key={data.carId} data={data} actionSlot={actionSlot} />
        )}
      />
      <LoadMoreTrigger ref={ref}>
        {isFetchingNextPage && <Icon type="loading" size={40} color="navy" />}
      </LoadMoreTrigger>
    </>
  );
};

import styled from "styled-components";
import { useInView } from "@/shared/hooks/\buseInView";
import { useEffect } from "react";
import { Icon } from "@/shared/ui/Icon/Icon";
const Container = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 17px;
  color: gray;
  margin-bottom: 20px;
`;
const LoadMoreTrigger = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
