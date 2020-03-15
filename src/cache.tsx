import * as React from 'react';
import { CacheBag, CacheObserver } from './cache-bag';
import {CacheContext} from './cache-context';

export type CacheAttributeCallback = (key: string, value: any) => void;


export type CacheProps = {
  values: any,
  observers: CacheObserver[],
  children: React.ReactNode
}

export const Cache = ({values, observers = [], children}: CacheProps) => {
  const bag = new CacheBag(values, observers);

  return (
    <CacheContext.Provider value={bag}>
      {children}
      </CacheContext.Provider>
  );
};
