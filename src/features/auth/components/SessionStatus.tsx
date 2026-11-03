import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initializeAuth } from "@/features/auth/api/initialize-auth";
import { useAuthStore } from "@/stores/auth.store";

export default function SessionStatus() {
  const error = useAuthStore((state) => state.initializationError);
  if (error) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl">Couldn’t restore your session</h1>
        <p role="alert">{error}</p>
        <Button onClick={() => void initializeAuth()}>Try again</Button>
      </main>
    );
  }
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background p-6">
      <div role="status" className="flex items-center gap-3 text-muted-foreground">
        <LoaderCircle aria-hidden="true" className="size-6 text-primary motion-safe:animate-spin" />
        <span>Loading…</span>
      </div>
    </main>
  );
}
