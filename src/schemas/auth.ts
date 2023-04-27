import { z } from "zod";
import { globalSchema } from ".";
import { schemaUtil } from "@/utils";

const { id } = globalSchema;

const { createString } = schemaUtil;

const name = createString({ fieldName: "name", min: 3, max: 255 });
const username = createString({ fieldName: "username", min: 3, max: 255 });
const password = createString({ fieldName: "password", min: 6, max: 150 });
const confirmPassword = createString({
  fieldName: "confirmPassword",
  min: 6,
  max: 150,
});
const email = z
  .string({
    required_error: "email is required",
    invalid_type_error: "email must be a string",
  })
  .trim()
  .toLowerCase()
  .email()
  .max(255, { message: "email must have a maximum length of 255 characters " });

export const authResult = z.object({ id, name, username, email });

export const signupForm = z
  .object({
    name,
    username,
    email,
    password,
    confirmPassword,
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export const signinForm = z.object({
  email,
  password,
});

export const forgotPasswordForm = z.object({
  email,
});

export const resetPasswordForm = z
  .object({
    password,
    confirmPassword,
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });
