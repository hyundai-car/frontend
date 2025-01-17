import {
  BasicSchema,
  CarSchema,
  ComparisonSchema,
} from "@/shared/model/car.contracts";
import { z } from "zod";

/** 차량 비교항목 */
export type Comparison = z.infer<typeof ComparisonSchema>;
/** 차량 기본정보 */
export type Basic = z.infer<typeof BasicSchema>;
/** 차량 정보 */
export type Car = z.infer<typeof CarSchema>;
export type BasicInfo = z.infer<typeof BasicSchema>;

// TODO Type 정리할 것
/** 차량 상세정보 */
interface Detail {
  carId: number;
  carName: string;
  year: string; // YYYY-MM 형식
  mileage: number;
  sellingPrice: number;
  exteriorColor: string;
  interiorColor: string;
  displacement: number;
  fuelType: string;
  transmissionType: string;
  location: string;
  fuelEfficiency: number;
  mainImage: string;
  newCarPrice: number;
  carNumber: string;
  seating: number;
  createdAt: string; // YYYY-MM-DD 형식
  updatedAt: string; // YYYY-MM-DD 형식
  mmScore: number;
  initialRegistrationDate: string;
}

export interface OptionList {
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

export interface AccidentHistory {
  accidentHistoryid: number;
  accidentDate: string; // YYYY-MM-DD 형식
  accidentCount: number;
  carPartsPrice: number;
  carLaborPrice: number;
  carPaintPrice: number;
  createdAt: string; // YYYY-MM-DD 형식
  updatedAt: string; // YYYY-MM-DD 형식
}

export interface CarData {
  cars: Detail;
  optionLists: OptionList;
  accidentHistories: AccidentHistory[];
}
