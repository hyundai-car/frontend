// entities/search/model/search.types.ts
import { type z } from "zod";
import { SearchSchema } from "./search.contracts";
// import { SearchResponseSchema, SearchSchema } from "./search.contracts";

export type TSearch = z.infer<typeof SearchSchema>;
// export type TSearchResponse = z.infer<typeof SearchResponseSchema>;

export interface SearchParams {
  keyword?: string;
  carType?: string;
  fuelType?: string;
  bodyType?: string;
  minSellingPrice?: number;
  maxSellingPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  minYear?: number;
  maxYear?: number;
  page?: number;
  size?: number;
}
