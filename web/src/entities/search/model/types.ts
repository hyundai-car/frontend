// entities/search/model/types.ts

export interface SearchParams {
  keyword?: string;
  carType?: string;
  fuelType?: string;
  bodyType?: string;
  minSellingPrice?: number;
  maxSellingPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  minYear?: number;
  maxYear?: number;
  page?: number;
  size?: number;
}

export interface IBaseCar {
  carId: number;
  carName: string;
  initialRegistration: string;
  mileage: number;
  sellingPrice: number;
  mainImage: string;
  carNumber: string;
  likeCount: number;
}

// 검색 결과에서 사용되는 차량 타입
export interface ISearchCar extends IBaseCar {
  isLike: boolean;
  createdAt: string;
  updatedAt: string;
}

// 추천 결과에서 사용되는 차량 타입
export interface IRecommendCar {
  recommendId: number;
  recommendedAt: string;
  recommendPriority: number;
  recommendCondition: string;
  recommendReason: string;
  createdAt: string;
  updatedAt: string;
  car: IBaseCar; // 기본 차량 정보만 포함
}
