import { feedbackApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetFeedbackForPreview = (id: number) => {
  const { data } = useQuery(["feedbacks", "preview", id], () =>
    feedbackApi.getByIdForPreview(id)
  );
  return data!;
};
