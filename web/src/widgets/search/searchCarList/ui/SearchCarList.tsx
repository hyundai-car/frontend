// import { useState, type ReactNode } from "react";
// import { mockCarListData } from "@/entities/search/api/mockCarListData";
import { StackedCard } from "@/entities/search";
import { WishlistButton } from "@/features/wishlist";
import { CarList } from "@/entities/search/carList/CarList";
import { useNavigate } from "react-router-dom";
import { useSearchCarListQuery } from "../api/searchCarList.query";
// type Props = {
//   actionSlot?: (carId: number) => ReactNode;
//   isFetching?: boolean;
// };

export const SearchCarList = () => {
  const navigate = useNavigate();
  // 액션슬롯을 내려줘서 자식 컴포넌트의 특정부분을 부모에서 제어
  // const [carList] = useState(mockCarListData.contents);
  const { data, isLoading } = useSearchCarListQuery();

  const getActionSlot = (carId: number) => <WishlistButton carId={carId} />;

  return (
    <CarList
      items={data?.contents || []}
      isFetching={isLoading}
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

// import { useSearchCarListQuery } from "../api/searchCarList.query";

// export const SearchCarList = () => {
//   const { data, isLoading, error } = useSearchCarListQuery();

//   if (isLoading) return <div>Loading...</div>;

//   if (error) {
//     console.error("Query Error:", error);
//     return <div>Error loading cars</div>;
//   }

//   return (
//     <div>
//       {data?.contents.map((car) => (
//         <div key={car.carId}>
//           {car.modelName} - {car.sellingPrice.toLocaleString()}원
//         </div>
//       ))}
//     </div>
//   );
// };
