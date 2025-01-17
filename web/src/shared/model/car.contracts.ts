import { z } from "zod";

/**
 * 차량 비교 항목
 */
export const ComparisonSchema = z.object({
  mmScore: z.number(),
  accidentCount: z.number(),
  initialRegistrationDate: z.string(),
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
 * 차량 정보
 */
export const CarSchema = z.object({
  carId: z.number(),
  modelName: z.string(),
  year: z.number(),
  mileage: z.number(),
  sellingPrice: z.number(),
  color: z.string(),
  fuelType: z.string(),
  transmissionType: z.string(),
  isOnSale: z.number(),
  location: z.string(),
  mmScore: z.number(),
  accidentCount: z.number(),
  initialRegistrationDate: z.string(),
  fuelEfficiency: z.number(),
  mileage: z.number(),
});

/**
 * 차량 기본 정보
 */
export const BasicSchema = z.object({
  ...ComparisonSchema.shape,
  carNumber: z.string(),
  exterorColor: z.string(),
  fuelType: z.string(),
  seating: z.number(),
});

/**
 * 차량 정보
 */
export const CarSchema = z.object({
  carId: z.number(),
  modelName: z.string(),
  mainImage: z.string(),
});
