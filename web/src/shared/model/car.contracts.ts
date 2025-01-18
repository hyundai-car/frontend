import { z } from "zod";

/**
 * 차량 비교 항목
 */
export const ComparisonSchema = z.object({
  mmScore: z.number(),
  accidentCount: z.number(),
  initialRegistration: z.string(),
  fuelEfficiency: z.number(),
  mileage: z.number(),
});

/**
 * 차량 기본 정보
 */
export const BasicSchema = z.object({
  ...ComparisonSchema.shape,
  carNumber: z.string(),
  exteriorColor: z.string(),
  fuelType: z.string(),
  seating: z.number(),
});

/**
 * 차량 옵션 정보
 */
export const OptionSchema = z.object({
  hasNavigation: z.boolean(),
  hasHiPass: z.boolean(),
  hasHeatedSteeringWheel: z.boolean(),
  hasHeatedSeats: z.boolean(),
  hasVentilatedFrontSeats: z.boolean(),
  hasPowerFrontSeats: z.boolean(),
  isLeatherSeats: z.boolean(),
  hasPowerTrunk: z.boolean(),
  hasSunroof: z.boolean(),
  hasHeadUpDisplay: z.boolean(),
  hasSurroundViewMonitor: z.boolean(),
  hasRearViewMonitor: z.boolean(),
  hasBlindSpotWarning: z.boolean(),
  hasLaneDepartureWarning: z.boolean(),
  hasSmartCruiseControl: z.boolean(),
  hasFrontParkingSensors: z.boolean(),
});
// /**
//  * 차량 정보
//  */
// export const CarSchema = z.object({
//   carId: z.number(),
//   modelName: z.string(),
//   year: z.number(),
//   mileage: z.number(),
//   sellingPrice: z.number(),
//   color: z.string(),
//   fuelType: z.string(),
//   transmissionType: z.string(),
//   isOnSale: z.number(),
//   location: z.string(),
//   mmScore: z.number(),
//   accidentCount: z.number(),
//   initialRegistrationDate: z.string(),
//   fuelEfficiency: z.number(),
//   mileage: z.number(),
// });

// /**
//  * 차량 정보
//  */
// export const CarSchema = z.object({
//   carId: z.number(),
//   modelName: z.string(),
//   mainImage: z.string(),
// });
