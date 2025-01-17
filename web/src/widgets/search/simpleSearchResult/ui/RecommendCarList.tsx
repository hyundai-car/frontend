import { useState, type ReactNode } from "react";
import { mockCarListData } from "@/entities/search/api/mockCarListData";
import { StackedCard } from "@/entities/search";
import { WishlistButton } from "@/features/wishlist";
import { CarList } from "@/entities/search/carList/CarList";
type Props = {
  actionSlot?: (carId: number) => ReactNode;
  isFetching?: boolean;
};

export const RecommendCarList = ({ isFetching = false }: Props) => {
  const [carList] = useState(mockCarListData.contents);

  const getActionSlot = (carId: number) => <WishlistButton carId={carId} />;

  return (
    <CarList
      items={carList}
      isFetching={isFetching}
      getActionSlot={getActionSlot}
      renderItem={(data, actionSlot) => (
        <StackedCard key={data.carId} data={data} actionSlot={actionSlot} />
      )}
    />
  );
};
