
export const deepCopy = (obj: any): any => {
  if (Array.isArray(obj)) {
    return [...obj];
  } else if (typeof obj === 'object') {
    let copy: any = {};
    Object.keys(obj).forEach(key => copy[key] = deepCopy(obj[key]));
    return copy;
  } else {
    return obj;
  }
};

