import { ExtendedAxiosError } from "@/types";

export const extractErrorMessage = (error: unknown): string | null => {
  if (!error) return null;

  const { response } = error as ExtendedAxiosError;
  const { type, message } = response.data;

  if (type === "GenericError") return null;

  return message;
};
