import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useDebounce Hook
 *
 * Debounces a callback function with a specified delay.
 * Useful for search, filtering, and other high-frequency events.
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced callback function
 *
 * @example
 * const debouncedSearch = useDebounce((value: string) => {
 *   setSearchResults(performSearch(value));
 * }, 500);
 *
 * <input onChange={(e) => debouncedSearch(e.target.value)} />
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
 * useDebounceValue Hook
 *
 * Debounces a value and returns the debounced version.
 * Useful for filtering state based on user input.
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns Debounced value
 *
 * @example
 * const [inputValue, setInputValue] = useState("");
 * const debouncedSearchQuery = useDebounceValue(inputValue, 500);
 *
 * useEffect(() => {
 *   setSearchResults(performSearch(debouncedSearchQuery));
 * }, [debouncedSearchQuery]);
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
