import { z } from "zod";

const message = "Id must be provided as a positive integer";

export const id = z.coerce
  .number({
    invalid_type_error: message,
  })
  .int({ message })
  .positive({ message });
