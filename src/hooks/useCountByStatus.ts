import { feedbackApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useCountByStatus = () => {
  const { data } = useQuery(["countByStatus"], feedbackApi.countByStatus);
  return data!;
};
