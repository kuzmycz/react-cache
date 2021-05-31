import { CacheBag } from '../src/cache-bag';
import { deepCopy } from './util.test';
// @ts-ignore

describe('Basic Bag tests', () => {
  test('Cache Bag Creation', () => {
    const values = { name: 'Clark Kent', gender: 'male', hero: 'Superman' };
    const initial = deepCopy(values);

    const bag = CacheBag.of(values);
    expect(bag).toBeDefined();
    expect(bag.content).toEqual(initial);
    expect(Object.is(bag.content, values)).toBe(true);
  });
  test('Cache Bag Creation - empty bag', () => {
    const values = undefined;

    const bag = CacheBag.of(values);
    expect(bag).toBeDefined();
    expect(bag.content).toEqual({});
  });

  test('Get a value', () => {
    const values = { name: 'Clark Kent', gender: 'male', hero: 'Superman' };
    const item = 'Clark Kent';
    const key = 'name';

    const bag = CacheBag.of(values);

    expect(bag.get(key)).toBe(item);
  });

  test('Set a value', () => {
    const values = { name: 'Clark Kent', gender: 'male', hero: 'Superman' };
    const item = 'Flash';
    const key = 'hero';

    const bag = CacheBag.of(values);
    bag.set(key, item);

    expect(bag.get(key)).toBe(item);
  });
});

describe('Global Observers', () => {
  test('Single observer', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );
    const observer = { key: '', callback: observerMock };

    const bag = CacheBag.of(values, [observer]);
    bag.set('name', 'Keven Kent');

    expect(observerMock.mock.calls.length).toBe(1);
    expect(observerMock.mock.calls[0][0]).toBe('name');
    expect(observerMock.mock.calls[0][1]).toBe('Keven Kent');
    expect(Object.is(observerMock.mock.calls[0][2], bag)).toBe(true);
  });
  test('Single observer, bad key', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );
    const observer = {
      key: (undefined as unknown) as string,
      callback: observerMock,
    };

    const bag = CacheBag.of(values, [observer]);
    bag.set('name', 'Keven Kent');

    expect(observerMock.mock.calls.length).toBe(1);
    expect(observerMock.mock.calls[0][0]).toBe('name');
    expect(observerMock.mock.calls[0][1]).toBe('Keven Kent');
    expect(Object.is(observerMock.mock.calls[0][2], bag)).toBe(true);
  });

  test('Multiple observers', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );
    const observerMock02 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );

    const bag = CacheBag.of(values, [
      { key: '', callback: observerMock01 },
      { key: '', callback: observerMock02 },
    ]);
    bag.set('name', 'Keven Kent');

    expect(observerMock01.mock.calls.length).toBe(1);
    expect(observerMock01.mock.calls[0][0]).toBe('name');
    expect(observerMock01.mock.calls[0][1]).toBe('Keven Kent');
    expect(Object.is(observerMock01.mock.calls[0][2], bag)).toBe(true);

    expect(observerMock02.mock.calls.length).toBe(1);
    expect(observerMock02.mock.calls[0][0]).toBe('name');
    expect(observerMock02.mock.calls[0][1]).toBe('Keven Kent');
    expect(Object.is(observerMock02.mock.calls[0][2], bag)).toBe(true);
  });

  test('Multiple same observers', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );

    const bag = CacheBag.of(values, [
      { key: '', callback: observerMock01 },
      { key: '', callback: observerMock01 },
    ]);
    bag.set('name', 'Keven Kent');

    expect(observerMock01.mock.calls.length).toBe(2);
  });

  test('Multiple observers, different filters', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );
    const observerMock02 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );

    const key = 'address.street';
    const value = '2 Somewhere Street';

    const bag = CacheBag.of(values, [
      { key: '', callback: observerMock01 },
      { key: 'address', callback: observerMock02 },
    ]);
    bag.set(key, value);

    expect(observerMock01.mock.calls.length).toBe(1);
    expect(observerMock01.mock.calls[0][0]).toBe(key);
    expect(observerMock01.mock.calls[0][1]).toBe(value);

    expect(observerMock02.mock.calls.length).toBe(1);
    expect(observerMock02.mock.calls[0][0]).toBe(key);
    expect(observerMock02.mock.calls[0][1]).toBe(value);

    expect(values.address.street).toBe(value);
  });

  test('Multiple observers, different filters, one activated', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );
    const observerMock02 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );

    const key = 'name';
    const value = 'Keven Kenley';

    const bag = CacheBag.of(values, [
      { key: '', callback: observerMock01 },
      { key: 'address', callback: observerMock02 },
    ]);
    bag.set(key, value);

    expect(observerMock01.mock.calls.length).toBe(1);
    expect(observerMock01.mock.calls[0][0]).toBe(key);
    expect(observerMock01.mock.calls[0][1]).toBe(value);

    expect(observerMock02.mock.calls.length).toBe(0);

    expect(values.name).toBe(value);
  });
});

describe('Value Observers', () => {
  test('Single Observer - value change', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn((_key: string, _value: any) => {
      return;
    });

    const key = 'address.state';
    const value = 'NJ';

    const bag = CacheBag.of(values);
    bag.subscribe(key, observerMock01);
    bag.set(key, value);

    expect(observerMock01.mock.calls.length).toBe(1);
    expect(observerMock01.mock.calls[0][0]).toBe(key);
    expect(observerMock01.mock.calls[0][1]).toBe(value);

    expect(values.address.state).toBe(value);
  });

  test('Single Observer - value unchange', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn((_key: string, _value: any) => {
      return;
    });

    const key = 'address.state';
    const value = 'NY';

    const bag = CacheBag.of(values);
    bag.subscribe(key, observerMock01);
    bag.set(key, value);

    expect(observerMock01.mock.calls.length).toBe(0);

    expect(values.address.state).toBe(value);
  });

  test('Single Observer - different key', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn((_key: string, _value: any) => {
      return;
    });

    const observerKey = 'address.state';
    const key = 'address.city';
    const value = 'Gothom City';

    const bag = CacheBag.of(values);
    bag.subscribe(observerKey, observerMock01);
    bag.set(key, value);

    expect(observerMock01.mock.calls.length).toBe(0);

    expect(values.address.city).toBe(value);
  });
});

describe('Subscriptions', () => {
  test('value Subscription', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn((_key: string, _value: any) => {
      return;
    });
    const observerMock02 = jest.fn((_key: string, _value: any) => {
      return;
    });

    const key = 'address.state';
    const value1 = 'NJ';
    const value2 = 'MA';
    const value3 = 'WA';

    const bag = CacheBag.of(values);
    bag.subscribe(key, observerMock02);
    bag.set(key, value1);
    bag.subscribe(key, observerMock01);
    bag.set(key, value2);
    bag.unsubscribe(key, observerMock01);
    bag.set(key, value3);

    expect(observerMock01.mock.calls.length).toBe(1);
    expect(observerMock01.mock.calls[0][0]).toBe(key);
    expect(observerMock01.mock.calls[0][1]).toBe(value2);
    expect(observerMock02.mock.calls.length).toBe(3);

    expect(values.address.state).toBe(value3);
  });

  test('Unsubscribe a non existing subscription', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn((_key: string, _value: any) => {
      return;
    });

    const key = 'address.state';

    const bag = CacheBag.of(values);
    expect(bag.unsubscribe(key, observerMock01)).toBeUndefined();
  });

  test('global Subscription', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );

    const key = 'address.state';
    const value1 = 'NJ';
    const value2 = 'MA';
    const value3 = 'WA';

    const bag = CacheBag.of(values);
    bag.set(key, value1);
    bag.subscribeCache(key, observerMock01);
    bag.subscribeCache(key, observerMock01); // double subscription test
    bag.set(key, value2);
    bag.unsubscribeCache(key, observerMock01);
    bag.set(key, value3);

    expect(observerMock01.mock.calls.length).toBe(1);
    expect(observerMock01.mock.calls[0][0]).toBe(key);
    expect(observerMock01.mock.calls[0][1]).toBe(value2);

    expect(values.address.state).toBe(value3);
  });
});

describe('Notifications', () => {
  test('Notify all', () => {
    const values = {
      name: 'Clark Kent',
      gender: 'male',
      hero: 'Superman',
      address: { street: '1 Some Street', city: 'Metropolis', state: 'NY' },
    };
    const observerMock01 = jest.fn((_key: string, _value: any) => {
      return;
    });
    const observerMock02 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );
    const observerMock03 = jest.fn(
      (_key: string, _value: any, _cache: CacheBag) => {
        return;
      }
    );

    const bag = CacheBag.of(values);
    bag.subscribe('address.city', observerMock01);
    bag.subscribeCache('', observerMock02);
    bag.subscribeCache('address', observerMock03);

    bag.notifyAll();

    expect(observerMock01.mock.calls.length).toBe(1);
    expect(observerMock01.mock.calls[0][0]).toBe('address.city');
    expect(observerMock01.mock.calls[0][1]).toBe('Metropolis');

    expect(observerMock02.mock.calls.length).toBe(1);
    expect(observerMock02.mock.calls[0][0]).toBe('');
    expect(observerMock02.mock.calls[0][1]).toEqual(bag.content);
    expect(observerMock02.mock.calls[0][2]).toEqual(bag);

    expect(observerMock03.mock.calls.length).toBe(1);
    expect(observerMock03.mock.calls[0][0]).toBe('address');
    expect(observerMock03.mock.calls[0][1]).toEqual(bag.content.address);
    expect(observerMock03.mock.calls[0][2]).toEqual(bag);
  });
});
