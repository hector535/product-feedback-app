import { api } from "@/api";
import { statusSchema } from "@/schemas";
import { GetAllStatusReturn } from "@/types";

export const getAll = async (): Promise<GetAllStatusReturn> => {
  const { data } = await api.get("/status");
  return statusSchema.getAll.parse(data);
};
