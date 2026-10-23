import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const shouldRetry = (failureCount: number, error: unknown) => {
  if (isAxiosError(error) && error.response && error.response.status < 500) {
    return false; // 4xx won't succeed on retry
  }
  return failureCount < 2;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: shouldRetry,
    },
  },
});
