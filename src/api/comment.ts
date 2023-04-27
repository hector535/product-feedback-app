import { api } from "./config";
import { AddCommentParams } from "@/types";

export const add = async (comment: AddCommentParams): Promise<void> => {
  await api.post("/comment", comment);
};

export const edit = async ({
  id,
  content,
}: {
  id: number;
  content: string;
}): Promise<void> => await api.put(`/comment/${id}`, { content });

export const remove = async (id: number): Promise<void> =>
  await api.delete(`/comment/${id}`);
