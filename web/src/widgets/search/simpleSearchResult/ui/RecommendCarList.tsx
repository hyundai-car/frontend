// import { useState, type ReactNode } from "react";
// import { mockCarListData } from "@/entities/search/api/mockCarListData";
import { StackedCard } from "@/entities/search";
import { CarList } from "@/entities/search/carList/CarList";
import { useSimpleSearchQuery } from "../api/simpleSearch.query";
import { useSimpleSearchStore } from "@/entities/simpleSearch/model/store";
import { useEffect } from "react";

export const RecommendCarList = ({
  setRecommendCondition,
}: {
  setRecommendCondition: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // const [carList] = useState(mockCarListData.contents);
  const { answers } = useSimpleSearchStore();
  const { data, isLoading } = useSimpleSearchQuery(
    answers as [number, number, number, number, number]
  );

  useEffect(() => {
    console.log(data?.contents[0]?.recommendCondition);
    if (data?.contents?.[0]?.recommendCondition) {
      setRecommendCondition(data.contents[0].recommendCondition);
    }
  }, []);
  const carItems =
    data?.contents?.map((item) => ({
      ...item.car,
      isLike: false,
    })) ?? [];

  return (
    <CarList
      // items={carList}
      items={carItems}
      isFetching={isLoading}
      renderItem={(data) => <StackedCard key={data.carId} data={data} />}
    />
  );
};
