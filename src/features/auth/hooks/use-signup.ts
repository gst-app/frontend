import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/auth.api";

export function useSignup() {
  return useMutation({ mutationFn: authApi.signup });
}
