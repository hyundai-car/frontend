import { z } from 'zod';

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