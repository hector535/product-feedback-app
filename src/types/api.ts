import { AxiosError } from "axios";

export type ErrorDetail = {
  property: string;
  message: string;
};

type CustomError = {
  type: "BadInputError" | "JWTError" | "GenericError";
  title: string;
  status: number;
  message: string;
  details?: ErrorDetail[];
};

export type ExtendedAxiosError = AxiosError & {
  response: {
    data: CustomError;
  };
};
