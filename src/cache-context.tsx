import * as React from 'react';
import { useContext } from 'react';

import { CacheBag } from './cache-bag';


export const CacheContext = React.createContext(new CacheBag());
export const useCacheContext = () => {
  const cache = useContext(CacheContext);

  return cache;
};
