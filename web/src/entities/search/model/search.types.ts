import { type z } from 'zod';
import { SearchSchema } from './search.contracts';

export type TSearch = z.infer<typeof SearchSchema>;