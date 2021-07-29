const Joi = require('joi');

const getBookings = {
  query: Joi.object().keys({
    reservationId: Joi.number(),
  }),
};

const getUsersToday = {
  query: Joi.object().keys({
    userId: Joi.number(),
  }),
};

module.exports = {
  getBookings,
  getUsersToday,
};
