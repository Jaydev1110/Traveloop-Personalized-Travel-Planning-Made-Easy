import { useEffect, useState } from 'react';

/** Advances index 0..length-1 on an interval (shared by multiple crossfades). */
export function useNatureRotator(length, intervalMs = 5500) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length < 2) return undefined;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [length, intervalMs]);

  return index;
}
