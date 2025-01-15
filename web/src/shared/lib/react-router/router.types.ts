/**
 * @file router.types.ts
 * @description 라우터에서 사용되는 타입을 정의합니다.
 * @exmaple
 */

import { CarsDetailParamsSchema, SearchQueryParamsSchema } from "@/shared/lib/react-router/router.contracts";
import { z } from "zod";

export type CarsDetailParams = z.infer<typeof CarsDetailParamsSchema>;

export type SearchQueryParams = z.infer<typeof SearchQueryParamsSchema>; 

export type SimpleSearchStep = '1' | '2' | '3' | '4' | '5';
export interface SimpleSearchParams {
  step?: SimpleSearchStep;
}
export interface SimpleSearchResultParams {
  // TODO(K) 결과 페이지에 필요한 파라미터들
  resultId: string;
}