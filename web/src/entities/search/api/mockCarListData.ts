// entities/search/api/mockCarListData.ts

import { ISearchCar } from "../model/types";
interface CarDataResponse {
  contents: ISearchCar[];
}

export const mockCarListData: CarDataResponse = {
  contents: [
    {
      carId: 1,
      carName: "목업 그랜저 하이브리드",
      initialRegistration: "2022-05",
      mileage: 25000,
      sellingPrice: 35000000,
      mainImage:
        "https://certified-static.hyundai.com/contents/goods/shootConts/tobepic/02/exterior/HIG241028009973/PRD602_233.JPG/dims/crop/2304x1536+600+770/resize/560x373/optimize",
      carNumber: "12가 3456",
      isLike: false,
      likeCount: 15,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-14",
    },
    {
      carId: 2,
      carName: "목업 제네시스 G80",
      initialRegistration: "2023-03",
      mileage: 15000,
      sellingPrice: 55000000,
      mainImage:
        "https://certified-static.hyundai.com/contents/goods/shootConts/tobepic/02/exterior/HIG241028009973/PRD602_233.JPG/dims/crop/2304x1536+600+770/resize/560x373/optimize",
      carNumber: "34나 5678",
      isLike: true,
      likeCount: 28,
      createdAt: "2024-01-12",
      updatedAt: "2024-01-14",
    },
    {
      carId: 3,
      carName: "목업 테슬라 모델 Y",
      initialRegistration: "2023-08",
      mileage: 8000,
      sellingPrice: 65000000,
      mainImage:
        "https://certified-static.hyundai.com/contents/goods/shootConts/tobepic/02/exterior/HIG241028009973/PRD602_233.JPG/dims/crop/2304x1536+600+770/resize/560x373/optimize",
      carNumber: "56다 7890",
      isLike: true,
      likeCount: 42,
      createdAt: "2023-12-28",
      updatedAt: "2024-01-14",
    },
    {
      carId: 4,
      carName: "BMW 520i",
      initialRegistration: "2022-11",
      mileage: 30000,
      sellingPrice: 48000000,
      mainImage:
        "https://certified-static.hyundai.com/contents/goods/shootConts/tobepic/02/exterior/HIG241028009973/PRD602_233.JPG/dims/crop/2304x1536+600+770/resize/560x373/optimize",
      carNumber: "78라 1234",
      isLike: false,
      likeCount: 8,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-14",
    },
    {
      carId: 5,
      carName: "포르쉐 카이엔",
      initialRegistration: "2023-06",
      mileage: 12000,
      sellingPrice: 95000000,
      mainImage:
        "https://certified-static.hyundai.com/contents/goods/shootConts/tobepic/02/exterior/HIG241028009973/PRD602_233.JPG/dims/crop/2304x1536+600+770/resize/560x373/optimize",
      carNumber: "90마 5678",
      isLike: true,
      likeCount: 35,
      createdAt: "2024-01-08",
      updatedAt: "2024-01-14",
    },
  ],
};
