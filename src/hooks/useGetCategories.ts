import { categoryApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const { data } = useQuery(["categories"], categoryApi.getAll);
  return data!;
};
