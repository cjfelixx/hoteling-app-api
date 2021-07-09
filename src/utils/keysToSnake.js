const toSnake = (str) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

const isObject = function (obj) {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function' && !(obj instanceof Date);
};

const keysToSnake = function (obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj).forEach((k) => {
      n[toSnake(k)] = keysToSnake(obj[k]);
    });

    return n;
  }

  if (Array.isArray(obj)) {
    return obj.map((i) => {
      return keysToSnake(i);
    });
  }

  return obj;
};

module.exports = keysToSnake;
