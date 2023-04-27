import { CommentSlice } from "@/types";
import { getMaxDepthBasedOnViewport } from "@/utils";
import { StateCreator } from "zustand";

export const createCommentSlice: StateCreator<CommentSlice> = (set) => ({
  selectedComment: null,
  mode: "add",
  maxDepth: getMaxDepthBasedOnViewport(),
  setComment: (selectedComment, mode) => set({ selectedComment, mode }),
  setMaxDepth: (maxDepth) => set({ maxDepth }),
});
