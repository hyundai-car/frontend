import { Loading } from "@/shared/ui/loading/Loading";
import styled from "styled-components";

export const CarList = <T extends { carId: number }>({
  items = [],
  isFetching,
  getActionSlot,
  renderItem,
}: {
  items?: T[];
  isFetching: boolean;
  getActionSlot?: (carId: number) => React.ReactNode;
  renderItem: (item: T, actionSlot?: React.ReactNode) => React.ReactNode;
}) => {
  if (items.length === 0) {
    return <Loading iconSize={100} isLoading={isFetching} />;
  }

  return (
    <Container $isFetching={isFetching}>
      {items.map((items) => renderItem(items, getActionSlot?.(items.carId)))}
    </Container>
  );
};

const Container = styled.div<{ $isFetching?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  opacity: ${({ $isFetching }) => ($isFetching ? 0.5 : 1)};
  pointer-events: ${({ $isFetching }) => ($isFetching ? "none" : "auto")};
`;
