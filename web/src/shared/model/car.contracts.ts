import { z } from "zod";

export const CarSchema = z.object({
  carId: z.number(),
  modelName: z.string(),
  year: z.number(),
  mileage: z.number(),
  sellingPrice: z.number(),
  color: z.string(),
  fuelType: z.string(),
  transmissionType: z.string(),
  is_on_sale: z.number(),
  location: z.string(),
  mm_score: z.number(),
  fuelEfficiency: z.number(),
  mainImage: z.string(),
  exteriorColor: z.string(),

  newCarPrice: z.number(),
  carNumber: z.number(),
  paymentDeliveryStatus: z.string(),
  contrancted_at: z.date(),
  payed_at: z.date(),
  deliveryStartedAt: z.date(),
  deliveryEndedAt: z.date(),
});
