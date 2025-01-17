// entities/search/model/search.contracts.ts
import { z } from "zod";

export const SearchSchema = z.object({
  carId: z.number(),
  modelName: z.string(),
  year: z.string(),
  mileage: z.number(),
  sellingPrice: z.number(),
  mainImage: z.string(),
  carNumber: z.string(),
  isLike: z.boolean(),
  likeCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const SearchResponseSchema = z.object({
  contents: z.array(SearchSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }),
});
