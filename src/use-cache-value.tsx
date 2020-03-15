import { useEffect, useState } from 'react';
import { useCacheContext } from 'cache-context';

export const useCacheValue = (key: string) => {
  const cache = useCacheContext();
  const [state, setState] = useState(cache && cache.get(key));
  const cacheHandler = (handlerKey: string, newValue: any) => (key === handlerKey) && setState(newValue);
  const setCache = (value: any) => cache.set(key, value);

  useEffect(() => {
    cache.subscribe(key, cacheHandler);

    return(() => cache.unsubscribe(key, cacheHandler));
  }, [cache]);

  return [state, setCache];
};
