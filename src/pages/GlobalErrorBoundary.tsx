import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { Button } from "@/components/ui/button";
import { isDevelopment } from "@/config/environment";

type ErrorPageProps = {
  status: number;
  title: string;
  message: string;
  details?: string;
  onHome: () => void;
  onRetry?: () => void;
};

const ErrorPage = ({ status, title, message, details, onHome, onRetry }: ErrorPageProps) => {
  return (
    <main className="flex min-h-svh items-center bg-background px-6 py-16 sm:px-10">
      <section className="mx-auto w-full max-w-2xl text-center">
        <div role="alert" aria-live="assertive">
          <div className="mx-auto mb-7 flex size-16 items-center justify-center rounded-2xl border border-border bg-accent text-primary">
            <AlertTriangle aria-hidden="true" className="size-8" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Error {status}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {message}
          </p>
          {isDevelopment && details ? (
            <pre className="mx-auto mt-6 max-h-40 max-w-xl overflow-auto rounded-xl border border-border bg-muted p-4 text-left text-xs whitespace-pre-wrap text-muted-foreground">
              {details}
            </pre>
          ) : null}
        </div>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          {onRetry ? (
            <Button size="lg" icon={<RefreshCw aria-hidden="true" />} onClick={onRetry}>
              Try again
            </Button>
          ) : null}
          <Button
            size="lg"
            variant={onRetry ? "outline" : "default"}
            icon={<Home aria-hidden="true" />}
            onClick={onHome}
          >
            Back to home
          </Button>
        </div>
      </section>
    </main>
  );
};

const getRouteErrorContent = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    const status = error.status;
    const title = status === 404 ? "We couldn’t find that page." : "Something went wrong.";
    const message =
      isDevelopment && error.statusText
        ? error.statusText
        : "The page could not be loaded. Please try again or return to the home page.";
    const details = isDevelopment
      ? typeof error.data === "string"
        ? error.data
        : JSON.stringify(error.data, null, 2)
      : undefined;
    return { status, title, message, details };
  }

  const details = isDevelopment
    ? error instanceof Error
      ? `${error.name}: ${error.message}\n\n${error.stack ?? ""}`
      : String(error)
    : undefined;
  return {
    status: 500,
    title: "Something went wrong.",
    message: isDevelopment
      ? "An unexpected error occurred while rendering this page."
      : "We couldn’t load this page. Please try again or return to the home page.",
    details,
  };
};

const GlobalErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const content = getRouteErrorContent(error);

  return (
    <ErrorPage {...content} onHome={() => navigate("/")} onRetry={() => window.location.reload()} />
  );
};

type OuterErrorBoundaryProps = { children: ReactNode };
type OuterErrorBoundaryState = { error: Error | null };

export class OuterErrorBoundary extends Component<
  OuterErrorBoundaryProps,
  OuterErrorBoundaryState
> {
  state: OuterErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): OuterErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (isDevelopment) {
      console.error("Unhandled application error", error, errorInfo);
    } else {
      console.error("Unhandled application error");
    }
  }

  render() {
    if (this.state.error) {
      const details = isDevelopment
        ? `${this.state.error.name}: ${this.state.error.message}\n\n${this.state.error.stack ?? ""}`
        : undefined;
      return (
        <ErrorPage
          status={500}
          title="Something went wrong."
          message={
            isDevelopment
              ? "An unexpected error occurred while rendering this page."
              : "We couldn’t load this page. Please try again or return to the home page."
          }
          details={details}
          onHome={() => window.location.assign("/")}
          onRetry={() => window.location.reload()}
        />
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
