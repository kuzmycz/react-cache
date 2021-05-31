import React, { useContext, useRef } from 'react';

import { CacheBag, CacheObserver } from './cache-bag';

export type CacheProps = {
  values: any;
  name?: string;
  observers?: CacheObserver[];
  namedStore?: string;
  children: React.ReactNode;
};

export const Cache = ({ values, namedStore, observers = [], children }: CacheProps) => {

  const ref = useRef<CacheBag>();
  console.log("Cache Creation: ", ref, ref && ref.current);

  if (ref.current === undefined || ref.current === null) {
    if (!!namedStore) {
      let global: any = window;
      if (!global[namedStore]) {
        global[namedStore] = {
          current: new CacheBag(values, observers),
        }
      }
      console.log("Cache Creation: Using external ref", namedStore);
      ref.current = global[namedStore]?.current;

    } else {
      ref.current = new CacheBag(values, observers);
    }
    console.log("Cache Creation: Bag created", ref && ref.current);
  }

  return <CacheContext.Provider value={ref.current ?? new CacheBag(values, observers)}>{children}</CacheContext.Provider>;
};

export const CacheContext = React.createContext(new CacheBag({name: 'Default Cache'}));
export const useCacheContext = () => {
  const cache = useContext(CacheContext);
  return cache;
};
