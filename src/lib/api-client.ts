import axios, { isAxiosError } from "axios";
import { getApiErrorCode } from "@/lib/api-error";
import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/stores/auth.store";
import { ERROR_CODE } from "@/config/error-codes";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();
export const API_CONFIGURATION_ERROR = API_BASE_URL
  ? null
  : "API configuration is missing. Set VITE_API_BASE_URL to the backend base URL.";

declare module "axios" {
  interface AxiosRequestConfig {
    /** Public endpoint: don't send the access token and never try to refresh on a 401. */
    skipAuth?: boolean;
    /** Set once a request has been retried after a refresh, so it can't loop. */
    _retry?: boolean;
    /** Session that dispatched the request; stale failures must not restore or clear it. */
    _sessionVersion?: number;
  }
}

const API_URL = API_BASE_URL ? `${API_BASE_URL.replace(/\/$/, "")}/api/v1` : undefined;

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // sends the httpOnly refresh cookie
  timeout: 15_000,
});

// No interceptors here, so a failing refresh can never trigger another refresh.
const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15_000,
});

// 401 codes that mean "the access token is missing or expired", so a refresh can fix it.
const REFRESHABLE_CODES = new Set<string>([
  ERROR_CODE.UNAUTHORIZED,
  ERROR_CODE.AUTHENTICATION_REQUIRED,
]);

let refreshPromise: Promise<string> | null = null;

/**
 * Gets a new access token using the refresh cookie.
 * Concurrent callers share one request: refresh tokens rotate, so a second parallel
 * refresh with the old cookie would look like token reuse and revoke the whole session.
 */
export function refreshAccessToken(): Promise<string> {
  if (API_CONFIGURATION_ERROR) return Promise.reject(new Error(API_CONFIGURATION_ERROR));
  const version = useAuthStore.getState().sessionVersion;
  refreshPromise ??= refreshClient
    .post<{ accessToken: string }>("/auth/refresh")
    .then(({ data }) => {
      if (useAuthStore.getState().sessionVersion !== version) {
        throw new Error("Session changed while refreshing.");
      }
      useAuthStore.getState().setAccessToken(data.accessToken);
      return data.accessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export function endSession() {
  useAuthStore.getState().clearSession();
  queryClient.clear();
}

apiClient.interceptors.request.use((config) => {
  if (API_CONFIGURATION_ERROR) throw new Error(API_CONFIGURATION_ERROR);
  const state = useAuthStore.getState();
  config._sessionVersion ??= state.sessionVersion;
  const token = state.accessToken;
  if (token && !config.skipAuth) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error) || !error.config) throw error;

    const original = error.config;

    if (error.response?.status !== 401 || original.skipAuth || original._retry) {
      throw error;
    }

    if (original._sessionVersion !== useAuthStore.getState().sessionVersion) {
      throw error;
    }

    const code = getApiErrorCode(error);

    // The account was turned off: a refresh can't help, so sign out right away.
    if (code === ERROR_CODE.USER_DEACTIVATED) {
      endSession();
      throw error;
    }

    // Any other explicit code is a real failure, not an expired token. No code (for example a
    // 401 from a proxy) still gets one refresh attempt.
    if (code && !REFRESHABLE_CODES.has(code)) throw error;

    original._retry = true;

    try {
      const token = await refreshAccessToken();
      original.headers.Authorization = `Bearer ${token}`;
      return await apiClient(original);
    } catch (refreshError) {
      // Only a rejected refresh means the session is over. Network errors, 429s and
      // 5xx are transient, so keep the user signed in.
      if (
        isAxiosError(refreshError) &&
        refreshError.response?.status === 401 &&
        original._sessionVersion === useAuthStore.getState().sessionVersion
      ) {
        endSession();
      }
      throw error;
    }
  },
);
