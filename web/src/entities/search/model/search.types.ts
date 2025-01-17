// entities/search/model/search.types.ts
import { type z } from "zod";
import { SearchResponseSchema, SearchSchema } from "./search.contracts";

export type TSearch = z.infer<typeof SearchSchema>;
export type TSearchResponse = z.infer<typeof SearchResponseSchema>;
