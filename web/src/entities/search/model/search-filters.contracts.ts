// entities/search/model/search-filters.contracts.ts
import { z } from "zod";

export const PriceRangeSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
});

export const MileageRangeSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
});

export const YearRangeSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
});

export const VehicleSearchFiltersSchema = z.object({
  fuelType: z.array(z.string()).optional(),
  bodyStyle: z.array(z.string()).optional(),
  priceRange: PriceRangeSchema.optional(),
  mileage: MileageRangeSchema.optional(),
  year: YearRangeSchema.optional(),
});
