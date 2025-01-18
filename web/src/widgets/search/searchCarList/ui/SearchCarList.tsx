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
  const { data, isLoading } = useSearchCarListQuery();

  const getActionSlot = (carId: number) => <WishlistButton carId={carId} />;

  if (!isLoading && (!data || data.contents.length === 0)) {
    // 데이터가 없을 경우 메시지와 버튼 표시
    return (
      <Container>
        <Message>검색 결과가 없습니다.</Message>
      </Container>
    );
  }

  return (
    <CarList
      items={data?.contents || []}
      isFetching={isLoading}
      getActionSlot={getActionSlot}
      renderItem={(data, actionSlot) => (
        <StackedCard key={data.carId} data={data} actionSlot={actionSlot} />
      )}
    />
  );
};

import styled from "styled-components";
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
