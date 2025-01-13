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
  newCarPrice: z.number(),
  car_number: z.number(),
  payment_delivery_status: z.string(),
  contrancted_at: z.date(),
  payed_at: z.date(),
  deliveryStarted_at: z.date(),
  deliveryEnded_at: z.date(),
});
