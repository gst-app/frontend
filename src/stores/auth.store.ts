import { create } from "zustand";
import type { User } from "@/features/auth/types";

interface AuthState {
  /** The auth token is stored in memory alone and never persisted. */
  accessToken: string | null;
  user: User | null;
  /** True once startup establishes a session or confirms the visitor is a guest. */
  isInitialized: boolean;
  initializationError: string | null;
  sessionVersion: number;
  setSession: (session: { accessToken: string; user: User }) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  setInitialized: () => void;
  setInitializationError: (message: string | null) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  user: null,
  isInitialized: false,
  initializationError: null,
  sessionVersion: 0,
  setSession: ({ accessToken, user }) =>
    set((state) => ({
      accessToken,
      user,
      isInitialized: true,
      initializationError: null,
      sessionVersion: state.sessionVersion + 1,
    })),
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  setInitialized: () => set({ isInitialized: true }),
  setInitializationError: (initializationError) => set({ initializationError }),
  clearSession: () =>
    set((state) => ({
      accessToken: null,
      user: null,
      isInitialized: true,
      initializationError: null,
      sessionVersion: state.sessionVersion + 1,
    })),
}));
