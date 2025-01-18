// import { useState, type ReactNode } from "react";
// import { mockCarListData } from "@/entities/search/api/mockCarListData";
import { useEffect } from "react";
import styled from "styled-components";
import { useSearchCarListQuery } from "../api/searchCarList.query";
import { StackedCard } from "@/entities/search";
import { CarList } from "@/entities/search/carList/CarList";
import { WishlistButton } from "@/features/wishlist";
import { useInView } from "@/shared/hooks/useInView";
import { Loading } from "@/shared/ui/loading/Loading";

export const SearchCarList = () => {
  // 액션슬롯을 내려줘서 자식 컴포넌트의 특정부분을 부모에서 제어
  // const [carList] = useState(mockCarListData.contents);
  const { ref, inView } = useInView({
    rootMargin: "100px", // 하단 100px 전에 미리 로드 시작
  });
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchCarListQuery();

  useEffect(() => {
    console.log("searchCarList : ", flatDataContents);
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const getActionSlot = (carId: number, isLike: boolean) => (
    <WishlistButton carId={carId} isLike={isLike} />
  );

  if (!isLoading && !data?.pages?.[0]?.contents?.length) {
    // 데이터가 없을 경우 메시지와 버튼 표시
    return (
      <Container>
        <Message>검색 결과가 없습니다.</Message>
      </Container>
    );
  }
  const flatDataContents = data?.pages.flatMap((page) => page.contents) ?? [];

  return (
    <>
      <CarList
        items={flatDataContents}
        isFetching={isLoading}
        getActionSlot={getActionSlot}
        renderItem={(data, actionSlot) => (
          <StackedCard key={data.carId} data={data} actionSlot={actionSlot} />
        )}
      />
      <Loading isLoading={isFetchingNextPage} ref={ref} />
    </>
  );
};

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
