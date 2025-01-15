import {
  BasicSchema,
  CarSchema,
  ComparisonSchema,
} from "@/shared/model/car.contracts";
import { z } from "zod";

/** 차량 비교항목 */
export type Comparison = z.infer<typeof ComparisonSchema>;
/** 차량 기본정보 */
export type Basic = z.infer<typeof BasicSchema>;
/** 차량 정보 */
export type Car = z.infer<typeof CarSchema>;
