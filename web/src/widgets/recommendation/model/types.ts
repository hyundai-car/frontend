import { Car } from "@/shared/model/car.types";
import { itemName } from "@/widgets/recommendation/model/constants";

export interface ComparisonAvg {
  mmScoreAvg: number;
  accidentCountAvg: number;
  initialRegistrationDateAvg: string;
  mileageAvg: number;
  fuelEfficiencyAvg: number;
}

export interface Comparison {
  mmScore: number;
  accidentCount: number;
  initialRegistrationDate: string;
  mileage: number;
  fuelEfficiency: number;
}
export type BestCarComparison = Pick<
  Car,
  | "carId"
  | "modelName"
  | "year"
  | "mileage"
  | "sellingPrice"
  | "color"
  | "fuelType"
  | "transmissionType"
  | "location"
  | "fuelEfficiency"
  | "mainImage"
  | "exteriorColor"
  | "carNumber"
  | "seating"
> &
  Comparison;

export interface ResultItems extends Comparison {
  carNumber: string;
  exteriorColor: string;
  fuelType: string;
  seating: number;
}

export type ItemName = (typeof itemName)[number];
