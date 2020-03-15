import { deepCopy } from '../src/util';

describe("deep copy", () => {
  test("empty object", () => {
    const original = {};

    const value = deepCopy(original);

    expect(value).toEqual(original);
    expect(Object.is(value, original)).toBe(false);
  });

  test("undefined copy", () => {
    const original = undefined;

    const value = deepCopy(original);

    expect(value).toEqual(original);
    expect(Object.is(value, original)).toBe(true);
  });

  test("string copy", () => {
    const original = "Hello";

    const value = deepCopy(original);

    expect(value).toEqual(original);
    expect(Object.is(value, original)).toBe(true);
  });

  test("Array copy", () => {
    const original = ["apple", "orange", "pear"];

    const value = deepCopy(original);

    expect(value).toEqual(original);
    expect(value).not.toBe(original);
    expect(Object.is(value, original)).toBe(false);
  });

  test("Nested Object Copy", () => {
    const original = {name: "Clark Kent", gender:'male', hero: 'Superman', address: {street: '1 Some Street', city:'Metropolis', state: 'NY'}};

    const value = deepCopy(original);

    expect(value).toEqual(original);
    expect(value).not.toBe(original);
    expect(Object.is(value, original)).toBe(false);
  });

  test("Deep Nested Object Copy", () => {
    const original = {
      section: "1",
      name:'Section 1',
      sections: [{
          section: 1,
          name: 'Section 1.1',
          sections: [{
            section: 1,
            name: 'Section 1.1.1',
            sections: [{
              section: 1,
              name: 'Section 1.1.1.1',
              sections: [
                {
                  section: 1,
                  name: 'Section 1.1.1.1.1',
                  sections: []}
              ]},{
              section: 2,
              name: 'Section 1.1.1.1.2',
              sections: undefined}
            ]}]
          }]};

    const value = deepCopy(original);

    expect(value).toEqual(original);
    expect(value).not.toBe(original);
    expect(Object.is(value, original)).toBe(false);
  });

});
