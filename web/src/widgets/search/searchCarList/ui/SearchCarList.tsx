import { useState, type ReactNode } from 'react';
import styled from 'styled-components';
import { mockCarListData } from '@/entities/search/api/mockCarListData';
import { StackedCard } from '@/entities/search';
import { WishlistButton } from '@/features/wishlist';

type Props = {
  actionSlot?: (carId: number) => ReactNode;
  isFetching?: boolean;
}

export const SearchCarList = ({isFetching }: Props) => {
  // 액션슬롯을 내려줘서 자식 컴포넌트의 특정부분을 부모에서 제어
  const [carList] = useState(mockCarListData.contents);

  const getActionSlot = (carId: number) => (
    <WishlistButton carId={carId} />
  )

  if (isFetching && carList.length === 0) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <Container $isFetching={isFetching}>
      {carList.map((data) => (
        <StackedCard
          key={data.carId}
          data={data}
          actionSlot={getActionSlot(data.carId)}
        />
      ))}
    </Container>
  );
};


const Container = styled.div<{ $isFetching?: boolean }>`
display: flex;
flex-direction: column;
gap: 20px;
  opacity: ${({ $isFetching }) => ($isFetching ? 0.5 : 1)};
  pointer-events: ${({ $isFetching }) => ($isFetching ? 'none' : 'auto')};
`;

const LoadingWrapper = styled.div`
  padding: 24px;
  text-align: center;
`;