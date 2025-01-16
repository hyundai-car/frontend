import { useState, type ReactNode } from "react";
import { mockCarListData } from "@/entities/search/api/mockCarListData";
import { StackedCard } from "@/entities/search";
import { WishlistButton } from "@/features/wishlist";
import { CarList } from "@/entities/search/carList/CarList";
import { useNavigate } from "react-router-dom";
type Props = {
  actionSlot?: (carId: number) => ReactNode;
  isFetching?: boolean;
};

export const SearchCarList = ({ isFetching = false }: Props) => {
  const navigate = useNavigate();
  // 액션슬롯을 내려줘서 자식 컴포넌트의 특정부분을 부모에서 제어
  const [carList] = useState(mockCarListData.contents);

  const getActionSlot = (carId: number) => <WishlistButton carId={carId} />;

  return (
    <CarList
      items={carList}
      isFetching={isFetching}
      getActionSlot={getActionSlot}
      renderItem={(data, actionSlot) => (
        <StackedCard
          key={data.carId}
          data={data}
          actionSlot={actionSlot}
          onClick={() => navigate(`/carDetail/${data.carId}`)}
        />
      )}
    />
  );
};
