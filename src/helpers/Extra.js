import { get, isEqual } from 'lodash';

export function compare(a, b, fields) {
  if (!fields) {
    // full compare a and b
    return isEqual(a, b);
  } else {
    return fields.every(field => get(a, field) === get(b, field));
  }
}

export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function omit(obj, omitValues = [null, undefined]) {
  Object.keys(obj).forEach(key => {
    if (omitValues.includes(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
}

export function pick(obj, keys = []) {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (keys.includes(key)) {
      result[key] = obj[key];
    }
  });
  return result;
}
