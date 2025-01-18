import {
  BasicSchema,
  // CarSchema,
  ComparisonSchema,
  OptionSchema,
} from "@/shared/model/car.contracts";
import { z } from "zod";

// TODO Type 정리할 것 -> 완료

/** 차량 비교항목(그래프 항목) */
export type Comparison = z.infer<typeof ComparisonSchema>;
/** 차량 기본정보 */
export type Basic = z.infer<typeof BasicSchema>;
/** 차량 옵션정보 */
export type Option = z.infer<typeof OptionSchema>;

/** 차량 정보 */
// export type Car = z.infer<typeof CarSchema>;
