import { statusSchema } from "@/schemas";
import { z } from "zod";

export type GetAllStatusReturn = z.infer<typeof statusSchema.getAll>;
