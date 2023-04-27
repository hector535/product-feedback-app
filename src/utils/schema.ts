import { z } from "zod";

type CreateString = {
  fieldName: string;
  min: number;
  max: number;
};

export const createString = ({ fieldName, min, max }: CreateString) => {
  return z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a string`,
    })
    .trim()
    .min(min, {
      message:
        min === 1
          ? `${fieldName} cannot be empty`
          : `${fieldName} cannot have less than ${min} characters`,
    })
    .max(max, {
      message: `${fieldName} cannot have more than ${max} characters in length`,
    });
};
