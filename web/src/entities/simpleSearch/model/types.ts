export interface ISimpleResultCarInfo {
  carId: number;
  carName: string;
  initialRegistration: string;
  mileage: number;
  sellingPrice: number;
  likeCount: number;
  fuelType: string;
  mainImage: string;
}

// export type TSimpleSearchAnswers = [number, number, number, number, number];

export type TRecommendAnswersRequest = [number, number, number, number, number];
