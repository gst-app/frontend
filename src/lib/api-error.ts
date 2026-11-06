import type { ErrorResponse } from "@/lib/api-types";
import { isAxiosError } from "axios";

/** Error body returned by the API. */

function getErrorBody(error: unknown): Partial<ErrorResponse> | undefined {
  return isAxiosError<Partial<ErrorResponse>>(error) ? error.response?.data : undefined;
}

/** The backend's machine-readable `code` (e.g. INVALID_EXPIRED_TOKEN), if the error has one. */
export function getApiErrorCode(error: unknown): string | undefined {
  return getErrorBody(error)?.code;
}

/** A message that is safe to show to the user.  */
export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (isAxiosError(error) && !error.response) {
    return "Can't reach the server. Check your connection and try again.";
  }

  return getErrorBody(error)?.message || fallback;
}

/**
 * Validation errors as { fieldName: firstMessage }, ready for react-hook-form's setError.
 * Empty when the error isn't a validation error.
 */
export function getApiFieldErrors(error: unknown): Record<string, string> {
  const fields: Record<string, string> = {};

  for (const { field, errors } of getErrorBody(error)?.errors ?? []) {
    if (errors[0]) fields[field] = errors[0];
  }

  return fields;
}

export function getRetryAfterSeconds(error: unknown): number | null {
  if (!isAxiosError(error) || error.response?.status !== 429) return null;

  const raw = error.response.headers?.["retry-after"];
  if (!raw) return null;

  const seconds = Number(raw);
  if (Number.isFinite(seconds)) return Math.max(0, Math.ceil(seconds));

  // Retry-After can also be an HTTP date
  const date = Date.parse(raw);
  return Number.isNaN(date) ? null : Math.max(0, Math.ceil((date - Date.now()) / 1000));
}
