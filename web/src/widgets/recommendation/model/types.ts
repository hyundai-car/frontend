import { Car } from "@/shared/model/car.types";

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

export type Comparison = Partial<bestCar>;
