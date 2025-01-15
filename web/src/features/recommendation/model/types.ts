import { Car } from "@/shared/model/car.types";

export type SelectCard = Pick<
  Car,
  "carId" | "modelName" | "sellingPrice" | "year" | "mileage" | "mainImage"
>;


