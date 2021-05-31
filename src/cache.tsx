import React, { useContext, useRef } from 'react';

import { CacheBag, CacheObserver } from './cache-bag';

export type CacheProps = {
  values: any;
  name?: string;
  observers?: CacheObserver[];
  children: React.ReactNode;
};

export const Cache = ({ values, observers = [], children }: CacheProps) => {

  const ref = useRef<CacheBag>();

  if (ref.current !== undefined || ref.current !== null) {
    ref.current = new CacheBag(values, observers);
  }

  return <CacheContext.Provider value={ref.current}>{children}</CacheContext.Provider>;
};

export const CacheContext = React.createContext(new CacheBag({name: 'Default Cache'}));
export const useCacheContext = () => {
  const cache = useContext(CacheContext);
  return cache;
};
