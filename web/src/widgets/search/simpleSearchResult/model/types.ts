import { IBaseCar } from "@/entities/search/model/types";

export interface RecommendCar {
  recommendId: number;
  recommendedAt: string;
  recommendPriority: number;
  recommendCondition: string;
  recommendReason: string;
  createdAt: string;
  updatedAt: string;
  car: IBaseCar;
}

export interface SimpleSearchResponse {
  contents: RecommendCar[];
}
// interface SimpleSearchRequest {
//   budget: string;
//   usage: string;
//   maintenance: string;
//   experience: string;
//   preferredType: string;
// }
