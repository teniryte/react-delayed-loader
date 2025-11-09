import { useEffect, useState, useRef } from 'react';

/**
 * A React hook that delays loading spinner display to prevent flickering for quick operations.
 *
 * @param isLoading - Current loading state
 * @param options - Configuration options
 * @param options.after - Delay before showing loader in milliseconds (default: 300)
 * @param options.minDuration - Minimum time to keep loader visible in milliseconds (default: 500)
 * @returns Whether to show the loader
 */
export const useDelayedLoader = (
  isLoading: boolean,
  {
    after = 300,
    minDuration = 500,
  }: {
    after?: number;
    minDuration?: number;
  } = {
    after: 300,
    minDuration: 500,
  }
) => {
  const [showLoading, setShowLoading] = useState(false);
  const loadingStartedAt = useRef<number | null>(null);
  const loadingShownAt = useRef<number | null>(null);
  const isLoadingLatestRef = useRef<boolean>(isLoading);

  useEffect(() => {
    isLoadingLatestRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      loadingStartedAt.current = performance.now();

      const timeoutId = setTimeout(() => {
        if (!isLoadingLatestRef.current) return;
        setShowLoading(true);
        loadingShownAt.current = performance.now();
      }, after);

      return () => clearTimeout(timeoutId);
    } else {
      if (loadingStartedAt.current && loadingShownAt.current) {
        const spinnerDuration = performance.now() - loadingShownAt.current;
        if (spinnerDuration >= minDuration) {
          setShowLoading(false);
        } else {
          const timeoutId = setTimeout(() => {
            setShowLoading(false);
          }, minDuration - spinnerDuration);

          return () => clearTimeout(timeoutId);
        }
      }
    }
  }, [isLoading, after, minDuration]);

  return showLoading;
};

export default useDelayedLoader;
