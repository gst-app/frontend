import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import SuccessLoader from "@/assets/icons/success-loader.svg?react"; // adjust path
import { Button } from "@/components/ui/button";
import { ERROR_CODE } from "@/config/error-codes";
import { ROUTES } from "@/config/routes";
import { useCountdown } from "@/hooks/use-countdown"; // adjust path
import { useResendVerification } from "@/features/auth/hooks/use-resend-verification";
import { useVerifyEmail } from "@/features/auth/hooks/use-verify-email";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import { getApiErrorCode, getApiErrorMessage } from "@/lib/api-error";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const attemptedLink = useRef<{ email: string; token: string } | null>(null);
  const [result, setResult] = useState<{ already: boolean } | null>(null);

  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";
  const validLink = forgotPasswordSchema.safeParse({ email }).success && Boolean(token.trim());

  const goToLogin = () => navigate(ROUTES.LOGIN, { replace: true, state: null });

  const verify = useVerifyEmail((alreadyVerified = false) =>
    setResult({ already: alreadyVerified }),
  );
  const resend = useResendVerification();
  const resendCooldown = useCountdown(60, { autoStart: false });
  const { mutate } = verify;

  // Run verification once per link
  useEffect(() => {
    if (
      !validLink ||
      (attemptedLink.current?.email === email && attemptedLink.current.token === token)
    )
      return;

    attemptedLink.current = { email, token };
    mutate({ email, token });
  }, [email, token, validLink, mutate]);

  // Success: let the loader finish filling, then redirect
  useEffect(() => {
    if (!result) return;
    const id = setTimeout(() => {
      toast.success(result.already ? "Email already verified" : "Email verified successfully");
      void navigate(ROUTES.LOGIN, { replace: true, state: null });
    }, 1200);
    return () => clearTimeout(id);
  }, [result, navigate]);

  // Incomplete or invalid link: nothing to do here, so send them to login
  useEffect(() => {
    if (validLink) return;
    toast.error("This verification link is invalid. Sign in to request a new one.", {
      id: "invalid-verify-link", // dedupes in React StrictMode
    });
    void navigate(ROUTES.LOGIN, { replace: true, state: null });
  }, [validLink, navigate]);

  if (!validLink) return null;

  const expired = getApiErrorCode(verify.error) === ERROR_CODE.INVALID_EXPIRED_TOKEN;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 py-10 text-center">
      <h1 className="sr-only">Verify your email</h1>

      {!verify.isError ? (
        <div role="status" className="flex flex-col items-center gap-8">
          <SuccessLoader width={80} height={80} aria-hidden="true" />
          <p className="font-heading text-lg text-black sm:text-xl">
            {result ? "Email verified" : "Verifying your email…"}
          </p>
        </div>
      ) : (
        <div className="flex w-full max-w-sm flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold">
            {expired ? "Link expired" : "Couldn't verify your email"}
          </h2>
          <p role="alert" className="text-sm text-muted-foreground">
            {expired
              ? "This link is invalid or has expired. Request a new verification email."
              : getApiErrorMessage(verify.error)}
          </p>

          {expired ? (
            <Button
              disabled={resend.isPending || resendCooldown.isRunning}
              onClick={() =>
                resend.mutate(
                  { email },
                  {
                    onSuccess: (data) => {
                      toast.success(data.message);
                      resendCooldown.restart();
                    },
                    onError: (error) => toast.error(getApiErrorMessage(error)),
                  },
                )
              }
            >
              {resend.isPending
                ? "Sending…"
                : resendCooldown.isRunning
                  ? `Resend in ${resendCooldown.remaining}s`
                  : "Resend verification email"}
            </Button>
          ) : (
            <Button disabled={verify.isPending} onClick={() => mutate({ email, token })}>
              Retry verification
            </Button>
          )}

          <Button variant="link" onClick={goToLogin}>
            Go to sign in
          </Button>
        </div>
      )}
    </main>
  );
}
