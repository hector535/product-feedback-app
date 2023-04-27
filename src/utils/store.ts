import { SetStorageParams } from "@/types";

export const getStorage = (key: string): Record<string, any> =>
  JSON.parse(
    sessionStorage.getItem(key) || localStorage.getItem(key) || "null"
  );

export const setStorage = ({ key, storage, value }: SetStorageParams): void =>
  window[storage].setItem(key, JSON.stringify(value));

export const removeItemFromStorage = (key: string): void => {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
};
