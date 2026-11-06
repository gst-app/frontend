import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // An mfa_required response is handled by the caller, which needs the mfaToken.
      if (data.status === "authenticated") useAuthStore.getState().setSession(data);
    },
  });
}
