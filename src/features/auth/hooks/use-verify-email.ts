import { useMutation } from "@tanstack/react-query";
import { ERROR_CODE } from "@/config/error-codes";
import { authApi } from "@/features/auth/api/auth.api";
import { getApiErrorCode } from "@/lib/api-error";

export function useVerifyEmail(onVerified: (alreadyVerified: boolean) => void) {
  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => onVerified(false),
    onError: (error) => {
      if (getApiErrorCode(error) === ERROR_CODE.USER_ALREADY_VERIFIED) {
        onVerified(true);
      }
    },
  });
}
