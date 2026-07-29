import { useEffect, useRef, useState } from "react";

/**
 * useMinimumLoadingDelay Hook
 *
 * Ensures loading state is shown for a minimum duration.
 * Prevents flickering and provides better UX when operations complete too quickly.
 *
 * @param isLoading - Whether the async operation is currently loading
 * @param minDelayMs - Minimum delay to show loading state (default: 1000ms)
 * @returns Whether to display the loading state
 */
export function useMinimumLoadingDelay(
  isLoading: boolean,
  minDelayMs: number = 1000
): boolean {
  const [displayLoading, setDisplayLoading] = useState(isLoading);
  const loadingStartTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      // Loading started - show immediately
      loadingStartTimeRef.current = Date.now();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayLoading(true);
    } else {
      // Loading finished - check minimum delay
      const elapsedTime = Date.now() - (loadingStartTimeRef.current || 0);
      const remainingDelay = Math.max(0, minDelayMs - elapsedTime);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (remainingDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayLoading(false);
          loadingStartTimeRef.current = null;
        }, remainingDelay);
      } else {
        setDisplayLoading(false);
        loadingStartTimeRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, minDelayMs]);

  return displayLoading;
}
