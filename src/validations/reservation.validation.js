const Joi = require('joi');
const { join } = require('lodash');

const createReservation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    workspaceId: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
};

const getReservations = {
  query: Joi.object().keys({
    reservationId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: join.string(),
  }),
};

const getReservation = {
  params: Joi.object().keys({
    reservationId: Joi.number(),
  }),
};

const updateReservation = {
  params: Joi.object().keys({
    reservationId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      workspaceId: Joi.number(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
    .min(1),
};

const deleteReservation = {
  params: Joi.object().keys({
    reservationId: Joi.number(),
  }),
};

module.exports = {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
