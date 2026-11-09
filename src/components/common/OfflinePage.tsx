import { useEffect, useState } from "react";
import { CloudOff, Plane, RefreshCw, Router, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { cn } from "@/lib/utils";

const TIPS = [
  { icon: Plane, text: "Make sure airplane mode is off" },
  { icon: Router, text: "Move closer to your router" },
  { icon: Wifi, text: "Try switching between Wi-Fi and mobile data" },
];

export function OfflinePage() {
  const isOnline = useOnlineStatus();
  const [checking, setChecking] = useState(false);
  const [stillOffline, setStillOffline] = useState(false);

  // Reload automatically shortly after the connection comes back
  useEffect(() => {
    if (!isOnline) return;
    const timer = setTimeout(() => window.location.reload(), 1500);
    return () => clearTimeout(timer);
  }, [isOnline]);

  // navigator.onLine can say "true" without real internet, so test with a request
  const checkConnection = async () => {
    setChecking(true);
    setStillOffline(false);
    try {
      await fetch(window.location.origin, { method: "HEAD", cache: "no-store" });
      window.location.reload();
    } catch {
      setStillOffline(true);
    } finally {
      setChecking(false);
    }
  };

  return (
    <main className="flex min-h-svh items-center bg-background px-6 py-16 sm:px-10">
      <section className="mx-auto w-full max-w-md text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex size-40 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/10 animation-duration-[2.5s] motion-reduce:animate-none" />
          <span className="absolute inset-5 rounded-full bg-accent" />
          <div className="relative animate-float motion-reduce:animate-none">
            {isOnline ? (
              <Wifi aria-hidden="true" className="size-16 text-primary" />
            ) : (
              <CloudOff aria-hidden="true" className="size-16 text-primary" />
            )}
          </div>
        </div>

        <div role="status" aria-live="polite">
          <h1 className="text-3xl tracking-tight sm:text-4xl">
            {isOnline ? "You're back online!" : "Oops, you've lost connection"}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {isOnline
              ? "Reloading your page…"
              : "Don't worry, we'll be right here. Reconnect and we'll pick things back up."}
          </p>
        </div>

        {!isOnline && (
          <>
            <ul className="mt-8 space-y-3 rounded-2xl border border-border bg-muted p-5 text-left text-sm text-muted-foreground">
              {TIPS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="mt-8"
              disabled={checking}
              onClick={checkConnection}
              icon={<RefreshCw aria-hidden="true" className={cn(checking && "animate-spin")} />}
            >
              {checking ? "Checking…" : "Try again"}
            </Button>

            {stillOffline && (
              <p className="mt-4 text-sm text-muted-foreground">
                Still offline. We'll reload as soon as you're connected.
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
