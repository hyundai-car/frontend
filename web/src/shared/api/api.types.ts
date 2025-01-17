//TODO 완료

/**
 * @description 차량 상세정보
 * */
interface DetailResponse {
  carId: number;
  carName: string;
  initialRegistration: string; // YY년 MM월 형식
  mileage: number;
  sellingPrice: number; // 만원 단위
  exteriorColor: string;
  interiorColor: string;
  displacement: number;
  fuelType: string;
  transmissionType: string;
  location: string;
  fuelEfficiency: number;
  mainImage: string;
  newCarPrice: number; // 만원 단위
  carNumber: string;
  seating: number;
  mmScore: number;
  createdAt: string; // YYYY-MM-DD 형식
  updatedAt: string; // YYYY-MM-DD 형식
}

export interface OptionListResponse {
  optionListId: number;
  hasNavigation: boolean;
  hasHiPass: boolean;
  hasHeatedSteeringWheel: boolean;
  hasHeatedSeats: boolean;
  hasVentilatedFrontSeats: boolean;
  hasPowerFrontSeats: boolean;
  isLeatherSeats: boolean;
  hasPowerTrunk: boolean;
  hasSunroof: boolean;
  hasHeadUpDisplay: boolean;
  hasSurroundViewMonitor: boolean;
  hasRearViewMonitor: boolean;
  hasBlindSpotWarning: boolean;
  hasLaneDepartureWarning: boolean;
  hasSmartCruiseControl: boolean;
  hasFrontParkingSensors: boolean;
  createdAt: string; // YYYY-MM-DD 형식
  updatedAt: string; // YYYY-MM-DD 형식
}

export interface AccidentHistoryResponse {
  accidentHistoryid: number;
  accidentDate: string; // YYYY-MM-DD 형식
  carPartsPrice: number; // 만원 단위
  carLaborPrice: number; // 만원 단위
  carPaintPrice: number; // 만원 단위
  createdAt: string; // YYYY-MM-DD 형식
  updatedAt: string; // YYYY-MM-DD 형식
}

export interface CarDetailResponse {
  cars: DetailResponse;
  optionLists: OptionListResponse;
  accidentHistories: AccidentHistoryResponse[];
  accidentCount: number;
}
