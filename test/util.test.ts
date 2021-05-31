
export const deepCopy = (obj: any): any => {
  if (obj == null) obj = undefined;

  if (Array.isArray(obj)) {
    return [...obj];
  } else if (typeof obj === 'object') {
    const copy: any = {};
    Object.keys(obj).forEach(key => (copy[key] = deepCopy(obj[key])));
    return copy;
  } else {
    return obj;
  }
};

describe('Test deep copy', () => {
  test('Deep copy of null', () => {
    const values = null;
    const initial = deepCopy(values);

    expect(initial).toBeUndefined();
  });
});