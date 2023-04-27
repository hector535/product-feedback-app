import { StateCreator } from "zustand";
import { removeItemFromStorage, getStorage, setStorage } from "@/utils";
import { AuthSlice, SignInAuthSlice } from "@/types";

const authState = getStorage("auth");
const rememberMeState = getStorage("remember-me");

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  id: authState?.id || 0,
  name: authState?.name || "",
  username: authState?.username || "",
  email: authState?.email || "",
  isLoggedIn: authState?.isLoggedIn || false,
  rememberMe: rememberMeState?.rememberMe || false,
  setRememberMe: (flag) => {
    setStorage({
      key: "remember-me",
      value: { rememberMe: flag },
      storage: "localStorage",
    });
    set({ rememberMe: flag });
  },
  setUser: ({ id, email, name, username, storage }: SignInAuthSlice) => {
    set({ id, name, username, email, isLoggedIn: true });
    setStorage({
      key: "auth",
      value: { id, name, username, email, isLoggedIn: true },
      storage,
    });
  },
  removeUser: () => {
    removeItemFromStorage("auth");
    set({ id: 0, name: "", username: "", email: "", isLoggedIn: false });
  },
});
