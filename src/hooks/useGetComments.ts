import { useQuery } from "@tanstack/react-query";
import { feedbackApi } from "@/api";

export const useGetComments = (feedbackId: number, commentId?: number) => {
  const { data } = useQuery(["comments", feedbackId, commentId], () =>
    feedbackApi.getComments(feedbackId, commentId)
  );

  return data!;
};
