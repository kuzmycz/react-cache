export class Bag {
  content: any;

  constructor(values: any = {}) {
    this.content = values;
  }

  static of(values: any) {
    return new Bag(values);
  }

  /**
   * Traverse the tree and return the node the contains the last attribute in
   * the key. This will return the object and key that we wish to get or set.
   *
   * If create is false then the method will short circuit if the node being
   * traversed is undefined. In this situation, undefined will be returned.
   *
   * @param key path to the object that we are interested in
   * @param create if true, create the node if its missing
   * @return [object, attribute]
   */
  protected getBase = (key: string, create: boolean = false): [any, string] => {
    const keys = key.split('.');

    if (keys.length < 2) {
      return [this.content, keys[0]];
    } else {
      let base = this.content;

      while (keys.length > 1) {
        let current = base[keys[0]];

        if (current === undefined) {
          if (create) {
            current = base[keys[0]] = {};
          } else {
            return [{}, keys.pop() || ''];
          }
        }

        base = current;
        keys.shift();
      }

      return [base, keys[0]];
    }
  };

  get = (key: string = ''): any => {
    const [base, attribute] = this.getBase(key);

    return base[attribute];
  };

  set = (key: string = '', value: any) => {
    const [base, attribute] = this.getBase(key, true);

    base[attribute] = value;
  };
}
