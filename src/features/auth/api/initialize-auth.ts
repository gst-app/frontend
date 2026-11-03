import { isAxiosError } from "axios";
import { authApi } from "@/features/auth/api/auth.api";
import { endSession, refreshAccessToken } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { useAuthStore } from "@/stores/auth.store";

let initializationPromise: Promise<void> | null = null;

export function initializeAuth(): Promise<void> {
  if (useAuthStore.getState().isInitialized) return Promise.resolve();
  if (initializationPromise) return initializationPromise;
  const version = useAuthStore.getState().sessionVersion;
  useAuthStore.getState().setInitializationError(null);
  initializationPromise = (async () => {
    try {
      await refreshAccessToken();
      if (useAuthStore.getState().sessionVersion !== version) return;
      const user = await authApi.me();
      if (useAuthStore.getState().sessionVersion !== version) return;
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setInitialized();
    } catch (error) {
      if (useAuthStore.getState().sessionVersion !== version) return;
      if (isAxiosError(error) && error.response?.status === 401) {
        endSession();
      } else {
        useAuthStore.getState().setInitializationError(getApiErrorMessage(error));
      }
    }
  })().finally(() => {
    initializationPromise = null;
  });
  return initializationPromise;
}
