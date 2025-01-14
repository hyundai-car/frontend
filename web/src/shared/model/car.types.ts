import { CarSchema } from "@/shared/model/car.contracts";
import { z } from "zod";

export type Car = z.infer<typeof CarSchema>;
