/**
 * @class ExampleComponent
 */

import * as React from 'react'
import { useState, useContext, useEffect } from 'react';

export type CacheAttributeCallback = (key: string, value: any) => void;

export type CacheCallback = (key: string, value: any, cache: CacheBag) => void;
export type CacheObserver = {key: string, callback: CacheCallback}

interface ObserverMap {
  [key: string]: CacheAttributeCallback[]
}

export class CacheBag {
  values: any;
  keyObservers: ObserverMap;
  observers: CacheObserver[];

  constructor(initial = {}, subscribers: CacheObserver[] = []) {
    this.values = {...initial};
    this.keyObservers = {};
    this.observers = subscribers;
  }

  get = (key: string) => {
    let [base, element] = this.getBase(key);

    if (base === undefined) return undefined;

    return base[element];
  };

  getBase = (key: string, create = false): [any, string] => {
    let path = (key && key.split('.')) || [];

    let base = this.values;
    if (base === undefined) {
      if (create) {
        base = this.values = {};
      } else {
        return [undefined, path.pop() as string];
      }
    }

    while (path.length > 1) {
      let current = base[path[0]];
      if (current === undefined) {
        if (create) {
          base[path[0]] = current = {};
        } else {
          return [undefined, path.pop() || key];
        }
      }
      path.shift();
      base = current;
    }

    return [base, path[0]];
  };

  set = (key: string, value: any) => {
    let [base, localKey] = this.getBase(key, true);

    if(base[localKey] !== value) {
      base[localKey] = value;

      this.notifyObservers(key, value);
    }
  };

  subscribe = (key: string, callback: CacheAttributeCallback) => {
    let o = this.keyObservers[key] || [];

    if (!o.includes(callback)) {
      this.keyObservers[key] = [...o, callback];
    }
  };

  subscribeCache = (observer: CacheObserver) => {
    let o = this.observers || [];

    if (!o.includes(observer)) {
      this.observers = [...o, observer];
    }
  };

  unsubscribe = (key: string, callback: CacheAttributeCallback) => {
    let o = this.keyObservers[key] || [];

    if (o.includes(callback)) {
      this.keyObservers[key] = o.filter(i => i !== callback);
    }
  };

  unsubscribeCache = (observer: CacheObserver) => {
    let o = this.observers || [];

    if (o.includes(observer)) {
      this.observers = o.filter(i => i !== observer);
    }
  };

  notifyObservers = (key: string, value: any) => {
    let o = this.keyObservers[key] || [];

    // notify key observers
    o.forEach(element => {
      element(key, value);
    });

    // notify cache observers
    this.observers.forEach(observer => {
      if(key.startsWith(observer.key)) {
        observer.callback(key, value, this);
      }
    });
  }
}

export const CacheContext = React.createContext(new CacheBag());

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
  )
};

export const useCacheValue = (key: string) => {
  const cache = useContext(CacheContext);
  const [state, setState] = useState(cache && cache.get(key));
  const cacheHandler = (handlerKey: string, newValue: any) => (key === handlerKey) && setState(newValue);
  const setCache = (value: any) => cache.set(key, value);
  cache.subscribe(key, cacheHandler);

  useEffect(() => {
    return(() => cache.unsubscribe(key, cacheHandler));
  }, []);

  return [state, setCache];
};

export type LogCacheProps = {
  display: boolean
};

export const LogCache = ({display= true}: LogCacheProps) => {
  const cache = useContext(CacheContext);
  const [value, setValue] = useState(cache.values);

  const observer = {
    key: '',
    callback: () => {
      console.log("CACHE", cache.values);
      setValue({...cache.values});
  }};

  useEffect(() => {
    cache.subscribeCache(observer);

    return () => cache.unsubscribeCache(observer);
  }, []);

  if (display) {
    return(<pre>{JSON.stringify(value, undefined, 2)}</pre>);
  } else {
    return(<div></div>);
  }
};
