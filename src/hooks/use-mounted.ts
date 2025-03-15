'use client';

import { useEffect, useState } from 'react';

/**
 * A hook that returns whether the component is mounted.
 * Useful for avoiding hydration mismatch errors.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
