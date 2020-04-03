import { Bag } from '../src/bag';
// @ts-ignore
import deepcopy from 'deepcopy';

describe('Create Bag', () => {
  test('Create a bag of values', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);

    const bag = Bag.of(values);

    expect(bag).toBeDefined();
    expect(bag.content).toBe(values);
    expect(bag.content).toEqual(initialContent);
    expect(Object.is(bag.content, values)).toBe(true);
  });
  test('Create a bag using undefined values', () => {
    const values = undefined;

    const bag = Bag.of(values);

    expect(bag).toBeDefined();
    expect(bag.content).toBeDefined();
    expect(bag.content).toEqual({});
    expect(Object.is(bag.content, values)).not.toBe(true);
  });
});

describe('Get Bag Item', () => {
  test('Retrieve an item from a bag', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const bag = Bag.of(values);

    expect(bag.get('name')).toBe(values.name);
    expect(bag.get('address.street')).toBe(values.address.street);
    expect(bag.get('address.city')).toBe(values.address.city);
    expect(bag.get('address.state')).toBe(values.address.state);
  });
  test('Retrieve a missing item from a bag', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const bag = Bag.of(values);

    expect(bag.get('dateOfBirth')).toBeUndefined();
  });
  test('Retrieve a missing item (with a long key) from a bag', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const bag = Bag.of(values);

    expect(bag.get('profile.personality.humour')).toBeUndefined();
  });
  test('Retrieve content using an undefined key', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const bag = Bag.of(values);
    const key = (undefined as unknown) as string;

    expect(bag.get(key)).toBeUndefined();
  });
  test('An empty key returns the entire content', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const bag = Bag.of(values);
    const key = '';

    expect(bag.get(key)).toBeUndefined();
  });
  test('A bad key or empty keys returns undefined', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const bag = Bag.of(values);
    const key = '......';

    expect(bag.get(key)).toBeUndefined();
  });
});

describe('Set Bag Items', () => {
  test('Set an item in a bag', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);
    const bag = Bag.of(values);
    const item = 'Daisey Duck';

    bag.set('name', item);

    expect(bag.get('name')).toBe(item);
    expect(bag.content).not.toEqual(initialContent);
    expect(Object.is(bag.content, values)).toBe(true);
    expect(values.name).toBe(item);
  });
  test('Set a nested item in a bag', () => {
    const values = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);
    const bag = Bag.of(values);
    const item = 'Duck Plains';
    const key = 'address.city';

    bag.set(key, item);

    expect(bag.get(key)).toBe(item);
    expect(bag.content).not.toEqual(initialContent);
    expect(Object.is(bag.content, values)).toBe(true);
    expect(values.address.city).toBe(item);
  });
  test('Set setting an new item', () => {
    const values: any = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);
    const bag = Bag.of(values);
    const item = 'Male';
    const key = 'gender';

    bag.set(key, item);

    expect(bag.get(key)).toBe(item);
    expect(bag.content).not.toEqual(initialContent);
    expect(Object.is(bag.content, values)).toBe(true);
    expect(values.gender).toBe(item);
  });
  test('Set setting a deeply nested new item', () => {
    const values: any = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);
    const bag = Bag.of(values);
    const item = 'Above Average';
    const key = 'profile.personality.humor';

    bag.set(key, item);

    expect(bag.get(key)).toBe(item);
    expect(bag.content).not.toEqual(initialContent);
    expect(Object.is(bag.content, values)).toBe(true);
    expect(values.profile.personality.humor).toBe(item);
  });
  test('Setting an item with an invalid key', () => {
    const values: any = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);
    const bag = Bag.of(values);
    const item = 'Invalid';
    const key = (undefined as unknown) as string;

    bag.set(key, item);

    expect(bag.get(key)).toBe(item);
    expect(bag.content).not.toEqual(initialContent);
  });

  test('Setting an item with an empty key', () => {
    const values: any = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);
    const bag = Bag.of(values);
    const item = 'Invalid';
    const key = '.';
    const mockError = jest.fn(x => x);

    console['error'] = mockError;
    bag.set(key, item);

    // Mock testing must be done first
    expect(mockError.mock.calls.length).toBe(0);

    expect(bag.get(key)).toBe(item); // will make a call to console.error
    expect(bag.content).not.toEqual(initialContent);
  });

  test('Setting an item with a nested empty key', () => {
    const values: any = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);
    const bag = Bag.of(values);
    const item = 'Invalid';
    const key = '.....';
    const mockError = jest.fn(x => x);

    console['error'] = mockError;
    bag.set(key, item);

    // Mock testing must be done first
    expect(mockError.mock.calls.length).toBe(0);

    expect(bag.get(key)).toBe(item); // will make a call to console.error
    expect(bag.content).not.toEqual(initialContent);
  });

  test('Setting an item with an unusual key', () => {
    const values: any = {
      name: 'Donald Duck',
      address: {
        street: '1 Disney Way',
        city: 'Some Place',
        state: 'Florida',
        zip: '01702',
      },
    };
    const initialContent = deepcopy(values);
    const bag = Bag.of(values);
    const item = '100';
    const key = 'profile.strange key.age';
    const mockError = jest.fn(x => x);

    console['error'] = mockError;
    bag.set(key, item);

    // Mock testing must be done first
    expect(mockError.mock.calls.length).toBe(0);

    expect(bag.get(key)).toBe(item); // will make a call to console.error
    expect(bag.content).not.toEqual(initialContent);
  });
});
