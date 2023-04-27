import { z } from "zod";
import { categorySchema } from "@/schemas";

export type Category = z.infer<typeof categorySchema.getAll>[0];
