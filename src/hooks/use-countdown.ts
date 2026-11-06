import { useCallback, useEffect, useState } from "react";

export function useCountdown(seconds: number, { autoStart = true } = {}) {
  const [remaining, setRemaining] = useState(autoStart ? seconds : 0);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setTimeout(() => setRemaining((current) => current - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining]);

  const restart = useCallback(() => setRemaining(seconds), [seconds]);

  return { remaining, isRunning: remaining > 0, restart };
}
