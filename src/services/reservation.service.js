const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const database = require('../config/knex');
const keysToCamel = require('../utils/keysToCamel');
const keysToSnake = require('../utils/keysToSnake');

/**
 * Create a Reservation
 * @param {Object} reservationBody
 * @returns {Promise<Reservation>}
 */
const createReservation = async (reservationBody) => {
  const foundReservation = await database('reservation').where({ id: reservationBody.id });
  const occupiedReservations = await database('reservation').where({ start_date: reservationBody.start_date });

  if (occupiedReservations.length !== 0) {
    throw new Error(`Already Reserved`);
  }
  if (foundReservation.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already Reserved');
  }
  const now = new Date();

  const Reservation = await database('reservation')
    .insert({
      ...keysToSnake(reservationBody),
      created_at: now,
      updated_at: now,
    })
    .returning('*');
  return keysToCamel(Reservation);
};

/**
 * Query for Reservations
 * @returns {Promise<QueryResult>}
 */
const queryReservations = async (filter,options) => {
  // TODO: Add pagination
  const Reservations = await database('reservation').select('*');
  return keysToCamel(Reservations);
};

/**
 * Get Reservation by id
 * @param {number} id
 * @returns {Promise<Reservation>}
 */
const getReservationById = async (reservationid) => {
  const Reservation = await database('reservation').where({ reservationid }).select('*');
  return keysToCamel(Reservation);
};

/**
 * Update Reservation by id
 * @param {number} id
 * @param {Object} updateBody
 * @returns {Promise<Reservation>}
 */
const updateReservationById = async (id, updateBody) => {
  const Reservation = await database('reservation').where({ id });
  if (!Reservation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reservation not found');
  }
  if (updateBody.email && (await database('reservation').where({ email: updateBody.email })).length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const updatedReservation = await database('reservation')
    .where({ id })
    .update({
      ...keysToSnake(updateBody),
      updated_at: new Date(),
    })
    .returning('*');
  return keysToCamel(updatedReservation);
};

/**
 * Delete Reservation by id
 * @param {number} id
 * @returns {Promise<Reservation>}
 */
const deleteReservationById = async (reservationid) => {
  const reservation = await database('reservation').where({ reservationid });
  if (!reservation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reservation not found');
  }
  await database('reservation').where({ reservationid }).del();
  return reservation;
};

module.exports = {
  createReservation,
  queryReservations,
  getReservationById,
  updateReservationById,
  deleteReservationById,
};