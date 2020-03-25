import { Bag } from './bag';

export type CacheAttributeCallback = (key: string, value: any) => void;

export interface ObserverMap {
  [key: string]: CacheAttributeCallback[];
}

export type CacheCallback = (key: string, value: any, cache: CacheBag) => void;
export type CacheObserver = { key: string; callback: CacheCallback };

export class CacheBag extends Bag {
  keyObservers: ObserverMap;
  observers: CacheObserver[];

  constructor(initial = {}, observers: CacheObserver[] = []) {
    super(initial);

    this.keyObservers = {};
    this.observers = observers;
  }

  set = (key: string = '', value: any) => {
    const [base, localKey] = this.getBase(key, true);

    if (base[localKey] !== value) {
      base[localKey] = value;

      this.notifyObservers(key, value);
    }
  };

  subscribe = (key: string = '', callback: CacheAttributeCallback) => {
    const o = this.keyObservers[key] || [];

    if (!o.includes(callback)) {
      this.keyObservers[key] = [...o, callback];
    }
  };

  subscribeCache = (filter: string = '', callback: CacheCallback) => {
    const o = this.observers;

    if (!o.find(s => s.key === filter && s.callback === callback)) {
      this.observers = [...o, { key: filter, callback }];
    }
  };

  unsubscribe = (key: string = '', callback: CacheAttributeCallback) => {
    const o = this.keyObservers[key] || [];

    if (o.includes(callback)) {
      this.keyObservers[key] = o.filter(i => i !== callback);
    }
  };

  unsubscribeCache = (filter: string = '', callback: CacheCallback) => {
    const o = this.observers;

    this.observers = o.filter(i => i.key !== filter && i.callback !== callback);
  };

  notifyObservers = (key: string = '', value: any) => {
    const o = this.keyObservers[key] || [];

    // notify key observers
    o.forEach(element => {
      element?.(key, value);
    });

    // notify cache observers
    this.observers.forEach(observer => {
      if (key.startsWith(observer.key || '')) {
        observer.callback?.(key, value, this);
      }
    });
  };

  notifyAll = () => {
    // Key observers
    Object.keys(this.keyObservers).forEach(key => {
      const value = this.get(key);
      const observers = this.keyObservers[key];

      observers.forEach(observer => {
        observer(key, value);
      });
    });

    // Global observers
    this.observers.forEach(observer => {
      observer.callback?.(
        observer.key,
        observer.key === '' ? this.content : this.get(observer.key),
        this
      );
    });
  };

  static of(values: any = {}, observers: CacheObserver[] = []) {
    return new CacheBag(values, observers);
  }
}
