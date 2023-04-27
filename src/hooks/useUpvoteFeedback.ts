/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { feedbackApi } from "@/api";
import { GetAllReturn, GetByIdForPreviewReturn } from "@/types";

const updateCacheData = (
  queryClient: QueryClient,
  idFeedbackToUpvote: number
) => {
  const cb = (oldFeedbacks: GetAllReturn) => {
    const { data, total } = oldFeedbacks!;

    const newData = data?.map((feedback) =>
      feedback.id === idFeedbackToUpvote
        ? {
            ...feedback,
            hasUpvoted: !feedback.hasUpvoted,
            upvotes: feedback.hasUpvoted
              ? feedback.upvotes - 1
              : feedback.upvotes + 1,
          }
        : feedback
    );

    return { total, data: newData };
  };

  const cachedPreviewFeedback = queryClient.getQueryData([
    "feedbacks",
    "preview",
    idFeedbackToUpvote,
  ]);
  const cachedAllFeedback = queryClient.getQueryData(["feedbacks", "all"]);
  const cachedSuggestionFeedbacks = queryClient.getQueryData([
    "feedbacks",
    "suggestions",
  ]);

  if (cachedPreviewFeedback) {
    queryClient.setQueryData<GetByIdForPreviewReturn>(
      ["feedbacks", "preview", idFeedbackToUpvote],
      (feedback) => {
        const clonedFeedback = { ...feedback! };

        clonedFeedback.hasUpvoted = !feedback!.hasUpvoted;
        clonedFeedback.upvotes = feedback!.hasUpvoted
          ? clonedFeedback.upvotes - 1
          : clonedFeedback.upvotes + 1;

        return clonedFeedback;
      }
    );
  }

  if (cachedAllFeedback) {
    queryClient.setQueryData<GetAllReturn>(["feedbacks", "all"], cb as any);
  }

  if (cachedSuggestionFeedbacks) {
    queryClient.setQueryData<GetAllReturn>(
      ["feedbacks", "suggestions"],
      cb as any
    );
  }
};

export const useUpvoteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation(feedbackApi.upvote, {
    onMutate: async (idFeedbackToUpvote) => {
      updateCacheData(queryClient, idFeedbackToUpvote);
    },

    onError: (err, idFeedbackToUpvote, context) => {
      updateCacheData(queryClient, idFeedbackToUpvote);
    },
  });
};
