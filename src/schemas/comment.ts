import { createString } from "@/utils/schema";
import { z } from "zod";

export const commentForm = z.object({
  comment: createString({ fieldName: "comment", min: 1, max: 255 }),
});
