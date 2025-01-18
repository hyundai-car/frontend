// import { useState, type ReactNode } from "react";
// import { mockCarListData } from "@/entities/search/api/mockCarListData";
import { StackedCard } from "@/entities/search";
import { WishlistButton } from "@/features/wishlist";
import { CarList } from "@/entities/search/carList/CarList";
import { useSimpleSearchQuery } from "../api/simpleSearch.query";
import { useSimpleSearchStore } from "@/entities/simpleSearch/model/store";
// type Props = {
//   actionSlot?: (carId: number) => ReactNode;
//   isFetching?: boolean;
// };

export const RecommendCarList = () => {
  // const [carList] = useState(mockCarListData.contents);
  const { answers } = useSimpleSearchStore();
  const { data, isLoading } = useSimpleSearchQuery(
    answers as [number, number, number, number, number]
  );

  const getActionSlot = (carId: number) => <WishlistButton carId={carId} />;

  return (
    <CarList
      // items={carList}
      items={data?.contents.map((item) => item.car) || []}
      isFetching={isLoading}
      getActionSlot={getActionSlot}
      renderItem={(data, actionSlot) => (
        <StackedCard key={data.carId} data={data} actionSlot={actionSlot} />
      )}
    />
  );
};
