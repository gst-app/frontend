import { useCallback, useEffect, useState } from "react";

type Options = {
  readonly autoStart?: boolean;
};

export function useCountdown(seconds: number, { autoStart = true }: Options = {}) {
  const [endsAt, setEndsAt] = useState<number | null>(() =>
    autoStart ? Date.now() + seconds * 1000 : null,
  );
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (endsAt === null) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= endsAt) setEndsAt(null);
    }, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const remaining = endsAt ? Math.max(0, Math.ceil((endsAt - now) / 1000)) : 0;

  const restart = useCallback(
    (next: number = seconds) => {
      const t = Date.now();
      setNow(t);
      setEndsAt(t + next * 1000);
    },
    [seconds],
  );

  return { remaining, isRunning: remaining > 0, restart };
}
