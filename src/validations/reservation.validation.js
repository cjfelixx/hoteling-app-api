const Joi = require('joi');

const createReservation = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    workspaceId: Joi.number().required(),
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater('now').min(Joi.ref('startDate')).required(),
  }),
};

const getReservations = {
  query: Joi.object().keys({
    reservationId: Joi.number(),
  }),
};

const getUserReservations = {
  query: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const getAvailableReservations = {
  body: Joi.object().keys({
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
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
  getUserReservations,
  getAvailableReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
