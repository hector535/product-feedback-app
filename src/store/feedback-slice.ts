import { StateCreator } from "zustand";
import { FeedbackSlice } from "@/types";

export const createFeedbackSlice: StateCreator<FeedbackSlice> = (set) => ({
  selectedFeedback: null,
  setFeedback: (selectedFeedback) => set({ selectedFeedback }),
});
