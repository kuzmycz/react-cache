import { default as React, useEffect, useState } from 'react';
import { deepCopy } from './util';
import { CacheBag } from './cache-bag';
import { useCacheContext } from './cache';

export type LogCacheProps = {
  display: boolean;
};

export const LogCache = ({ display = true }: LogCacheProps) => {
  const cache = useCacheContext();
  const [value, setValue] = useState(deepCopy(cache.content));
  const key = '';
  const callback = (_key: string, _value: any, cache: CacheBag) =>
    setValue(deepCopy(cache.content));

  // This log is intentional
  console.log('CACHE', value);

  useEffect(() => {
    cache.subscribeCache(key, callback);

    return () => cache.unsubscribeCache(key, callback);
  }, [cache]);

  if (display) {
    return <pre>{JSON.stringify(value, undefined, 2)}</pre>;
  } else {
    return <div></div>;
  }
};
