import { useEffect, useState } from 'react';
import { useCacheContext } from './cache';

export const useCacheValue = (key: string) => {
  const cache = useCacheContext();
  const [state, setState] = useState(cache && cache.get(key));
  const setCache = (value: any) => cache.set(key, value);

  useEffect(() => {
    const cacheHandler = (handlerKey: string, newValue: any) =>
      key === handlerKey && setState(newValue);
    cache.subscribe(key, cacheHandler);

    return () => cache.unsubscribe(key, cacheHandler);
  }, [cache, key]);

  return [state, setCache];
};
