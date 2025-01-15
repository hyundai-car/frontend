/**
 * @file router.types.ts
 * @description 라우터에서 사용되는 타입을 정의합니다.
 * @exmaple
 */

import { CarsDetailParamsSchema, SearchQueryParamsSchema } from "@/shared/lib/react-router/router.contracts";
import { z } from "zod";

export type CarsDetailParams = z.infer<typeof CarsDetailParamsSchema>;

export type SearchQueryParams = z.infer<typeof SearchQueryParamsSchema>; 
