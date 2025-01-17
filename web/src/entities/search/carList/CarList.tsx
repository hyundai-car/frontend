export const CarList = <T extends { carId: number }>({
  items,
  isFetching,
  getActionSlot,
  renderItem,
}: {
  items: T[];
  isFetching: boolean;
  getActionSlot?: (carId: number) => React.ReactNode;
  renderItem: (item: T, actionSlot?: React.ReactNode) => React.ReactNode;
}) => {
  if (isFetching && items.length === 0) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <Container $isFetching={isFetching}>
      {items.map((item) => renderItem(item, getActionSlot?.(item.carId)))}
    </Container>
  );
};
import styled from "styled-components";
const Container = styled.div<{ $isFetching?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  opacity: ${({ $isFetching }) => ($isFetching ? 0.5 : 1)};
  pointer-events: ${({ $isFetching }) => ($isFetching ? "none" : "auto")};
`;

const LoadingWrapper = styled.div`
  padding: 24px;
  text-align: center;
`;
