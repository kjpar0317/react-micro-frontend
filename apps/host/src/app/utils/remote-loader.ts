import { lazy, type ComponentType } from 'react';

/**
 * A safe version of React.lazy that catches network errors (e.g. 404 remoteEntry.js)
 * and returns a component that throws an error, which can be caught by SafeRemote.
 */
export function safeLazy<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
) {
  return lazy(() =>
    importFn().catch((error) => {
      console.error('[SafeLazy] Failed to load remote component:', error);
      
      // Return a component that throws to trigger the closest Error Boundary (SafeRemote)
      return {
        default: (() => {
          throw new Error('Remote module fetch failed or connection refused');
        }) as unknown as T,
      };
    })
  );
}
