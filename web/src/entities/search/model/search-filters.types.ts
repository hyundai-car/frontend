// entities/search/model/search-filters.types.ts
import { 
  VehicleSearchFiltersSchema,
  PriceRangeSchema,
  MileageRangeSchema,
  YearRangeSchema 
} from "./search-filters.contracts";
import { z } from "zod";

export type PriceRange = z.infer<typeof PriceRangeSchema>;
export type MileageRange = z.infer<typeof MileageRangeSchema>;
export type YearRange = z.infer<typeof YearRangeSchema>;
export type VehicleSearchFilters = z.infer<typeof VehicleSearchFiltersSchema>;
