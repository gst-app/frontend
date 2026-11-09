import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { cn } from "@/lib/utils";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const handleOnline = () => {
      setShowBackOnline(true);
      timer = setTimeout(() => setShowBackOnline(false), 3000);
    };
    const handleOffline = () => {
      clearTimeout(timer);
      setShowBackOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showBackOnline) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-auto flex animate-slide-up items-center gap-3 rounded-full px-5 py-3 text-sm font-medium shadow-lg motion-reduce:animate-none",
          isOnline ? "bg-primary text-primary-foreground" : "bg-foreground text-background",
        )}
      >
        {isOnline ? (
          <>
            <Wifi aria-hidden="true" className="size-4" />
            Back online
          </>
        ) : (
          <>
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-secondary" />
            </span>
            <WifiOff aria-hidden="true" className="size-4" />
            You're offline. We'll reconnect automatically.
          </>
        )}
      </div>
    </div>
  );
}
