import { create } from "zustand";
import { createAuthSlice } from "./auth-slice";
import { createUISlice } from "./ui-slice";
import { createCommentSlice } from "./comment-slice";
import {
  CommentSlice,
  type AuthSlice,
  type UISlice,
  FeedbackSlice,
} from "@/types";
import { createFeedbackSlice } from "./feedback-slice";

export const useStore = create<
  UISlice & AuthSlice & CommentSlice & FeedbackSlice
>()((...a) => ({
  ...createUISlice(...a),
  ...createAuthSlice(...a),
  ...createCommentSlice(...a),
  ...createFeedbackSlice(...a),
}));
