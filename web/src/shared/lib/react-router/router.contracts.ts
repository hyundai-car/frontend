/**
 * @file router.contracts.ts (구조)
 * @description 라우터 유효성 검사를 위한 Zod 스키마를 정의합니다.
 * @exmaple
 */

import { VehicleSearchFiltersSchema } from "@/entities/search/model/search-filters.contracts";
import { z } from "zod";

export const CarsDetailParamsSchema = z.object({ carNo: z.string() });

export const SearchQueryParamsSchema = z.object({
  query: z.string().optional(),
  page: z.number().optional(),
    size: z.number().optional(),
  filters: VehicleSearchFiltersSchema.optional(),
}); 