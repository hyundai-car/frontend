import { Basic } from "@/shared/model/car.types";

/** 찜 선택 리스트 전체 평균 데이터 타입 */
interface ComparisonAvg {
  mmScoreAvg: number;
  accidentCountAvg: number;
  initialRegistrationDateAvg: string;
  mileageAvg: number;
  fuelEfficiencyAvg: number;
}

export interface BestCar extends Basic {
  carId: number;
  modelName: string;
  mainImage: string;
  sellingPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface BestCarResponse {
  bestCar: BestCar;
  comparisonAvg: ComparisonAvg;
  otherCarIds: number[];
}
