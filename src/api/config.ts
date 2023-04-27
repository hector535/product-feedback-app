import { queryClient } from "@/lib/react-query/client";
import { useStore } from "@/store";
import { ExtendedAxiosError } from "@/types";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const onResponseError = (
  error: ExtendedAxiosError
): Promise<ExtendedAxiosError> => {
  const type = error.response?.data?.type;
  const status = error.response?.data?.status;

  if (type === "JWTError") {
    queryClient.resetQueries();
    useStore.getState().removeUser();
  } else if (error.config?.method !== "get") {
    if (status === 500) {
      useStore.getState().toggleElement("error", true);
    }
  }

  return Promise.reject(error);
};

api.interceptors.response.use(null, onResponseError);
