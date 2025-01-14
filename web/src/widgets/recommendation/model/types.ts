import { Car } from "@/shared/model/car.types";
import { itemName } from "@/widgets/recommendation/model/constants";

export type bestCar = Pick<
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
> & { accidentCount: number };

export interface Comparison {
  carNumber: string;
  exteriorColor: string;
  fuelType: string;
  seating: number;
  mmScoreAvg: number;
  accidentCountAvg: number;
  initialRegistrationDateAvg: string;
  mileageAvg: number;
  fuelEfficiencyAvg: number;
}

export type ItemName = (typeof itemName)[number];
