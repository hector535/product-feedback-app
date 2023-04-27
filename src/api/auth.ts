import { authSchema } from "@/schemas";
import { api } from "./config";
import {
  AuthResult,
  ResetPasswordParams,
  SignInForm,
  SignUpForm,
} from "@/types";

export const signin = async ({
  email,
  password,
}: SignInForm): Promise<AuthResult> => {
  const { data } = await api.post("/auth/signin", { email, password });
  return authSchema.authResult.parse(data);
};

export const signup = async ({
  name,
  username,
  email,
  password,
  confirmPassword,
}: SignUpForm): Promise<void> => {
  await api.post("/auth/signup", {
    name,
    username,
    email,
    password,
    confirmPassword,
  });
};

export const forgotPassword = async (email: string): Promise<void> =>
  await api.post(`/auth/forgot-password`, { email });

export const resetPassword = async ({
  token,
  password,
  confirmPassword,
}: ResetPasswordParams): Promise<void> =>
  await api.post(`/auth/reset-password`, {
    token,
    password,
    confirmPassword,
  });

export const activateEmail = async (tokenizedEmail: string): Promise<void> => {
  await api.post("/auth/activate-email", { token: tokenizedEmail });
};
