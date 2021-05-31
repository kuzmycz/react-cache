import * as React from 'react';
import {useEffect, useState} from 'react';
import { deepCopy } from './util';
import { CacheBag, useCacheContext } from '../dist';

export type LogCacheProps = {
  display: boolean;
};

export const CacheLog = ({ display = true }: LogCacheProps) => {
  const cache = useCacheContext();
  const [value, setValue] = useState(deepCopy(cache.content));
  const key = '';
  const callback = (_key: string, _value: any, cache: CacheBag) =>
    setValue(deepCopy(cache.content));

  // This log is intentional
  console.log('CACHE:', value);

  useEffect(() => {
    cache.subscribeCache(key, callback);

    return () => cache.unsubscribeCache(key, callback);
  }, [cache]);

  if (display) {
    return <pre>{JSON.stringify(value, undefined, 2)}</pre>;
  } else {
    return <div> </div>;
  }
};
