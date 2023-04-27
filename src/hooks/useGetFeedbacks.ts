import { feedbackApi } from "@/api";
import { GetAllParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetFeedbacks = ({
  limit,
  offset,
  status,
  key,
}: GetAllParams & { key: "all" | "suggestions" }) => {
  const { data } = useQuery(["feedbacks", key], () =>
    feedbackApi.getAll({ limit, offset, status })
  );

  return data!;
};
