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
  isOnSale: z.number(),
  location: z.string(),
  mmScore: z.number(),
  fuelEfficiency: z.number(),
  mainImage: z.string(),
  exteriorColor: z.string(),
  seating: z.number(),
  accidentCount: z.number(),
  initialRegistrationDate: z.string(),

  newCarPrice: z.number(),
  carNumber: z.number(),
  paymentDeliveryStatus: z.string(),
  contranctedAt: z.date(),
  payedAt: z.date(),
  deliveryStartedAt: z.date(),
  deliveryEndedAt: z.date(),
});
