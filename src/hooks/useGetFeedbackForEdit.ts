import { feedbackApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetFeedbackForEdit = (id: number) => {
  const { data } = useQuery(["feedbacks", "edit", id], () =>
    feedbackApi.getByIdForEdit(id)
  );
  return data!;
};
