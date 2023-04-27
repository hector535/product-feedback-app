import { commentSchema } from "@/schemas";
import { z } from "zod";

export type Comment = {
  id: number;
  content: string;
  enabled: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    img: string;
  };
  comments: Comment[] | null;
};

export type CommentForm = z.infer<typeof commentSchema.commentForm>;

export type AddCommentParams = {
  content: string;
  feedback: {
    id: number;
  };
  replyingTo: {
    id: number;
  } | null;
};
