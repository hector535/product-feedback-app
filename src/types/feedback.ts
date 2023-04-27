import { z } from "zod";
import { feedbackSchema } from "@/schemas";

export type CountByStatusReturn = z.infer<typeof feedbackSchema.countByStatus>;

export type GetAllParams = {
  limit: number;
  offset: number;
  status: "all" | "suggestion" | "planned" | "in-progress" | "live";
};

export type GetAllReturn = z.infer<typeof feedbackSchema.getAll>;
export type FeedbackWithoutComments = z.infer<
  typeof feedbackSchema.getAll.shape.data
>[0];

export type FeedbackWithStatus = FeedbackWithoutComments;

export type GetByIdForEditReturn = z.infer<
  typeof feedbackSchema.getByIdForEdit
>;

export type GetByIdForPreviewReturn = z.infer<
  typeof feedbackSchema.getByIdForPreview
>;

export type NewFeedbackForm = z.infer<typeof feedbackSchema.newForm>;
export type EditFeedbackForm = z.infer<typeof feedbackSchema.editForm>;
