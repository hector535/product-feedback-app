import { z } from "zod";
import { schemaUtil } from "@/utils";
import { globalSchema } from "@/schemas";

const { id } = globalSchema;
const { createString } = schemaUtil;

const name = createString({ fieldName: "name", min: 1, max: 255 });

export const getAll = z.array(
  z.object({
    id,
    name,
  })
);
