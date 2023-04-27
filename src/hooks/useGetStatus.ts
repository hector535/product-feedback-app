import { statusApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetStatus = () => {
  const { data } = useQuery(["status"], statusApi.getAll);
  return data!;
};
