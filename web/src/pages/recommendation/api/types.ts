// 가장 좋은 차량 정보
// interface BestCar {
//   carId: number;
//   modelName: string;
//   mainImage: string;
//   mmScore: number;
//   accidentCount: number;
//   initialRegistrationDate: string; // 'YYYY-MM-DD' 형식
//   mileage: number;
//   fuelEfficiency: number;
//   sellingPrice: number;
//   carNumber: string;
//   exteriorColor: string;
//   fuelType: string;
//   seating: number;
//   createdAt: string; // 'YYYY-MM-DD' 형식
//   updatedAt: string; // 'YYYY-MM-DD' 형식
// }

import { Car } from "@/shared/model/car.types";

// 비교 데이터
interface ComparisonAvg {
  mmScoreAvg: number;
  accidentCountAvg: number;
  initialRegistrationDateAvg: string; // 'YYYY-MM-DD' 형식
  mileageAvg: number;
  fuelEfficiencyAvg: number;
}

// 전체 응답 타입
export interface BestCarResponse {
  bestCar: Car;
  comparisons: ComparisonAvg;
  otherCarIds: number[];
}
