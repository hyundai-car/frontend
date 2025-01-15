import { BestCarResponse } from "@/entities/recommendation/api/types";

export const MOCK_LikeList = [
  {
    carId: 0,
    modelName:
      "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑르블랑르블랑르블랑르블랑르블랑르블랑르블랑르블랑르블랑르블랑르블랑르블랑르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
  {
    carId: 1,
    modelName: "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
  {
    carId: 2,
    modelName: "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
  {
    carId: 3,
    modelName: "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
  {
    carId: 4,
    modelName: "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
  {
    carId: 5,
    modelName: "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
  {
    carId: 6,
    modelName: "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
  {
    carId: 7,
    modelName: "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
  {
    carId: 8,
    modelName: "2022 그랜저(IG 하이브리드 샘이 솟아라오베이 르블랑",
    year: 2107,
    mileage: 20000,
    mainImage:
      "https://www.kia.com/content/dam/kwp/kr/ko/main-kv-contents/202411/kv_the_new_sportage_pc.jpg",
    sellingPrice: 54000,
  },
];

export const MOCK_BestCarData: BestCarResponse = {
  bestCar: {
    carId: 12345,
    modelName: "Tesla Model S",
    mainImage: "https://example.com/images/tesla-model-s.jpg",
    sellingPrice: 85000,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-10"),
    mmScore: 95,
    accidentCount: 0,
    initialRegistrationDate: "2024-01-01",
    fuelEfficiency: 130.5,
    mileage: 12000,
  },
  comparisonAvg: {
    mmScoreAvg: 89.5,
    accidentCountAvg: 1.2,
    initialRegistrationDateAvg: "2023-06-15",
    mileageAvg: 15000,
    fuelEfficiencyAvg: 125.7,
  },
  otherCarIds: [54321, 67890, 11223],
};
