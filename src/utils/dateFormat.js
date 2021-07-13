const dateToString = (obj) => {
  return obj.toISOString().split('T')[0];
};

const dateToObj = (obj) => {
  return new Date(obj);
};
module.exports = { dateToString, dateToObj };
