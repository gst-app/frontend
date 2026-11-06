import { LoaderCircle, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ERROR_CODE } from "@/config/error-codes";
import { ROUTES } from "@/config/routes";
import { useVerifyEmail } from "@/features/auth/hooks/use-verify-email";
import { useResendVerification } from "@/features/auth/hooks/use-resend-verification";
import AuthModal from "@/features/auth/components/AuthModal";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import { getApiErrorCode, getApiErrorMessage } from "@/lib/api-error";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const attemptedLink = useRef<{ email: string; token: string } | null>(null);
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";
  const validEmail = forgotPasswordSchema.safeParse({ email }).success;
  const validLink = validEmail && Boolean(token.trim());

  const signIn = () => navigate(ROUTES.LOGIN, { replace: true, state: null });

  const complete = (alreadyVerified = false) => {
    toast.success(alreadyVerified ? "Email already verified" : "Email verified successfully");
    void navigate(ROUTES.LOGIN, { replace: true, state: null });
  };

  const verify = useVerifyEmail(complete);
  const resend = useResendVerification();
  const { mutate } = verify;

  useEffect(() => {
    if (
      !validLink ||
      (attemptedLink.current?.email === email && attemptedLink.current.token === token)
    )
      return;

    attemptedLink.current = { email, token };
    mutate({ email, token });
  }, [email, token, validLink, mutate]);

  const expired = getApiErrorCode(verify.error) === ERROR_CODE.INVALID_EXPIRED_TOKEN;
  return (
    <AuthModal>
      <section className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6 text-center lg:min-h-full lg:p-12">
        {validLink && !verify.isError ? (
          <div role="status" className="flex flex-col items-center gap-4">
            <LoaderCircle
              aria-hidden="true"
              className="size-16 text-primary motion-safe:animate-spin"
            />
            <span>Verifying your email…</span>
          </div>
        ) : (
          <Mail aria-hidden="true" className="size-16 text-primary" />
        )}
        <h1 className="text-3xl">Verify your email</h1>
        <p>
          {validLink
            ? `We will verify ${email} automatically and redirect you to sign in.`
            : "This verification link is incomplete or invalid. Open the full link from your email."}
        </p>
        {validLink && verify.isError && !expired ? (
          <Button
            disabled={verify.isPending || resend.isPending}
            onClick={() => verify.mutate({ email, token })}
          >
            Retry verification
          </Button>
        ) : null}
        {verify.isError ? (
          <p role="alert" className="text-sm text-destructive">
            {expired
              ? "This link is invalid or has expired. Request a new verification email."
              : getApiErrorMessage(verify.error)}
          </p>
        ) : null}
        {validEmail ? (
          <Button
            variant="outline"
            disabled={resend.isPending || verify.isPending}
            onClick={() =>
              resend.mutate({ email }, { onSuccess: (data) => toast.success(data.message) })
            }
          >
            {resend.isPending ? "Sending…" : "Resend verification email"}
          </Button>
        ) : null}
        {resend.isError ? (
          <p role="alert" className="text-sm text-destructive">
            {getApiErrorMessage(resend.error)}
          </p>
        ) : null}
        <Button variant="ghost" onClick={signIn}>
          Go to sign in
        </Button>
      </section>
    </AuthModal>
  );
}
