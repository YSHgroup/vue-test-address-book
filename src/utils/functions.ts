function isObject(value: string | object | []) {
  return value && typeof value === 'object' && value.constructor === Object;
}

export { isObject };
