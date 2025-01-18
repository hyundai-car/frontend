/**
 * @description 추천후보페이지에서 추천 api에서 받은 response type
 */

import { Basic } from "@/shared/model/car.types";

/** 찜 선택 리스트 전체 평균 데이터 타입 */
export interface ComparisonAvg {
  mmScoreAvg: number;
  accidentCountAvg: number;
  initialRegistrationAvg: string;
  mileageAvg: number;
  fuelEfficiencyAvg: number;
}

export interface BestCar extends Basic {
  carId: number;
  carName: string;
  mainImage: string;
  sellingPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Normalization {
  accidentCountNorm: number;
  fuelEfficiencyNorm: number;
  initialRegistrationNorm: number;
  mileageNorm: number;
  mmScoreNorm: number;
}
export interface Graph {
  avg: Normalization;
  best: Normalization;
}

export interface BestCarResponse {
  bestCar: BestCar;
  comparisons: ComparisonAvg;
  graph: Graph;
  otherCarIds: number[];
}
