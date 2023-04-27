import { z } from "zod";
import { globalSchema } from ".";
import { createString } from "@/utils/schema";

const { id } = globalSchema;

export const getAll = z.array(
  z.object({
    id,
    name: createString({ fieldName: "name", min: 1, max: 255 }),
  })
);
