import type { StateCreator } from "zustand";
import type { ToggleKeys, UISlice } from "@/types";

export const createUISlice: StateCreator<UISlice> = (set) => ({
  toggleableElements: {} as Record<ToggleKeys, boolean>,
  toggleElement: (key, value) =>
    set((state) => ({
      toggleableElements: { ...state.toggleableElements, [key]: value },
    })),
});
