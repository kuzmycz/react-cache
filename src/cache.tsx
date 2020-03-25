import * as React from 'react';
import { useContext } from 'react';

import { CacheBag, CacheObserver } from './cache-bag';

export type CacheProps = {
  values: any;
  observers: CacheObserver[];
  children: React.ReactNode;
};

export const Cache = ({ values, observers = [], children }: CacheProps) => {
  const bag = new CacheBag(values, observers);

  return <CacheContext.Provider value={bag}>{children}</CacheContext.Provider>;
};

export const CacheContext = React.createContext(new CacheBag());
export const useCacheContext = () => {
  const cache = useContext(CacheContext);

  return cache;
};
