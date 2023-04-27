import { api } from "@/api";
import { feedbackSchema } from "@/schemas";
import {
  GetAllReturn,
  GetAllParams,
  CountByStatusReturn,
  GetByIdForEditReturn,
  GetByIdForPreviewReturn,
  EditFeedbackForm,
  NewFeedbackForm,
  Comment,
} from "@/types";

export const countByStatus = async (): Promise<CountByStatusReturn> => {
  const { data } = await api.get("/feedback/status");
  return feedbackSchema.countByStatus.parse(data);
};

export const getAll = async ({
  limit = 10,
  offset = 0,
  status = "all",
}: GetAllParams): Promise<GetAllReturn> => {
  const { data } = await api.get(
    `/feedback?limit=${limit}&offset=${offset}&status=${status}`
  );
  return feedbackSchema.getAll.parse(data);
};

export const getByIdForEdit = async (
  id: number
): Promise<GetByIdForEditReturn> => {
  const { data } = await api.get(`/feedback/${id}/edit`);
  return feedbackSchema.getByIdForEdit.parse(data);
};

export const getComments = async (
  feedbackId: number,
  commentId?: number
): Promise<Comment[] | null> => {
  let url = `/feedback/${feedbackId}/comments`;

  if (commentId) url += `/${commentId}`;

  const { data } = await api.get(url);
  return feedbackSchema.comments.parse(data);
};

export const getByIdForPreview = async (
  id: number
): Promise<GetByIdForPreviewReturn> => {
  const { data } = await api.get(`/feedback/${id}`);
  return feedbackSchema.getByIdForPreview.parse(data);
};

export const add = async (feedback: NewFeedbackForm): Promise<void> =>
  await api.post(`/feedback`, feedback);

export const edit = async ({
  id,
  feedback,
}: {
  id: number;
  feedback: EditFeedbackForm;
}): Promise<void> => await api.put(`/feedback/${id}`, feedback);

export const remove = async (id: number): Promise<void> =>
  await api.delete(`/feedback/${id}`);

export const upvote = async (id: number): Promise<void> =>
  await api.post(`/feedback/${id}/upvote`);
