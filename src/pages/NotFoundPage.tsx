import { ArrowLeft, Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-svh items-center bg-background px-6 py-16 sm:px-10">
      <section className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1.5 text-sm font-semibold text-primary">
            <SearchX aria-hidden="true" className="size-4" />
            <span>404 · Page not found</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Looks like you took a wrong turn.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            We couldn&apos;t find the page you were looking for. Let&apos;s get you back somewhere
            useful.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" icon={<Home aria-hidden="true" />} onClick={() => navigate("/")}>
              Back to home
            </Button>
            <Button
              size="lg"
              variant="outline"
              icon={<ArrowLeft aria-hidden="true" />}
              onClick={() => window.history.back()}
            >
              Go back
            </Button>
          </div>
        </div>

        <div aria-hidden="true" className="mx-auto w-full max-w-sm">
          <div className="relative flex aspect-square items-center justify-center rounded-3xl border border-border bg-muted">
            <span className="select-none text-[clamp(8rem,28vw,14rem)] font-bold leading-none -tracking-widest text-primary">
              404
            </span>
            <span className="absolute bottom-7 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Lost in the green
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
