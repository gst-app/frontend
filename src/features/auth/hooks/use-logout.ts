import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/auth.api";
import { endSession } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { toast } from "sonner";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      endSession();
      await authApi.logout();
    },
    onError: (error) =>
      toast.error(
        `${getApiErrorMessage(error)} You are signed out locally; the server session may still be active.`,
      ),
  });
}
