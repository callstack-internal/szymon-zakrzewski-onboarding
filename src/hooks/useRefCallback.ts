import {useCallback, useRef} from 'react';

export function useRefCallback(callback: () => void) {
  const callbackRef = useRef(callback);
  // Assing callback in every render to update ref's deps.
  callbackRef.current = callback;

  return useCallback(() => {
    callbackRef.current();
  }, []);
}
