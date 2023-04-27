import { z } from "zod";
import { type Comment } from "./comment";
import { feedbackSchema } from "@/schemas";

export type Mode = "add" | "edit" | "reply" | "delete";
export type ToggleKeys =
  | "delete-feedback"
  | "delete-comment"
  | "error"
  | "comment-form"
  | "drawer";

export type UISlice = {
  toggleableElements: Record<ToggleKeys, boolean>;
  toggleElement: (key: ToggleKeys, value: boolean) => void;
};

type Storage = "localStorage" | "sessionStorage";

export type SignInAuthSlice = {
  id: number;
  name: string;
  username: string;
  email: string;
  storage: Storage;
};

export type SetStorageParams = {
  key: string;
  value: unknown;
  storage: Storage;
};

export type AuthSlice = {
  id: number;
  name: string;
  username: string;
  email: string;
  isLoggedIn: boolean;
  rememberMe: boolean;
  setUser: (p: SignInAuthSlice) => void;
  removeUser: () => void;
  setRememberMe: (value: boolean) => void;
};

export type CommentSlice = {
  selectedComment: Comment | null;
  maxDepth: number;
  mode: Mode;
  setComment: (comment: Comment | null, mode: Mode) => void;
  setMaxDepth: (depth: number) => void;
};

type Feedback = z.infer<typeof feedbackSchema.getByIdForPreview>;

export type FeedbackSlice = {
  selectedFeedback: Feedback | null;
  setFeedback: (feedback: Feedback | null) => void;
};
