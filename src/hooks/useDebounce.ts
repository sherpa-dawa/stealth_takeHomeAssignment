import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useDebounce Hook - Debounces a callback function with a specified delay.
 * Useful for search, filtering, and other high-frequency events.
 */
export function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number = 300
): (...args: Args) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * useDebounceValue Hook - Debounces a value and returns the debounced version.
 * Useful for filtering state based on user input.
 */
export function useDebounceValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
