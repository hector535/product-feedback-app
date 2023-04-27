import { z } from "zod";
import { authSchema } from "@/schemas";

export type SignInForm = z.infer<typeof authSchema.signinForm>;
export type SignUpForm = z.infer<typeof authSchema.signupForm>;
export type AuthResult = z.infer<typeof authSchema.authResult>;
export type ForgotPasswordForm = z.infer<typeof authSchema.forgotPasswordForm>;
export type ResetPasswordForm = z.infer<typeof authSchema.resetPasswordForm>;
export type ResetPasswordParams = {
  token: string;
  password: string;
  confirmPassword: string;
};
