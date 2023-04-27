import { api } from "@/api";
import { categorySchema } from "@/schemas";
import { Category } from "@/types";

export const getAll = async (): Promise<Category[]> => {
  const { data } = await api.get("/category");
  return categorySchema.getAll.parse(data);
};
