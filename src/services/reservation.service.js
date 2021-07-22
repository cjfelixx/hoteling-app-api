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
  const occupiedReservations = await database('reservation')
    .where({ workspaceid: reservationBody.workspaceId })
    .where('start_date', '<', reservationBody.endDate)
    .andWhere('end_date', '>', reservationBody.startDate);

  if (occupiedReservations.length !== 0) {
    throw new Error(`Already Reserved`);
  }

  const now = new Date();

  const Reservation = await database('reservation')
    .insert({
      userid: reservationBody.userId,
      workspaceid: reservationBody.workspaceId,
      start_date: new Date(reservationBody.startDate),
      end_date: new Date(reservationBody.endDate),
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
const queryReservations = async () => {
  const now = new Date();
  const Reservations = await database('reservation').where('end_date', '>=', now).select('*');
  return keysToCamel(Reservations);
};

/**
 * Query for Available Reservations
 * @returns {Promise<QueryResult>}
 */

const queryAvailableReservations = async (reservationBody) => {
  const reservationSubquery = database('reservation')
    .where('start_date', '<=', reservationBody.endDate)
    .andWhere('end_date', '>=', reservationBody.startDate)
    .select('workspaceid');
  const availableReservations = await database('workspace').where('workspaceid', 'not in', reservationSubquery);
  return keysToCamel(availableReservations);
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
 * Get Reservation by userid
 * @param {number} id
 * @returns {Promise<Reservation>}
 */
const queryReservationByUser = async (userid) => {
  const now = new Date();
  const Reservation = await database('reservation').where({ userid }).where('end_date', '>=', now).select('*');
  return keysToCamel(Reservation);
};

/**
 * Update Reservation by id
 * @param {number} id
 * @param {Object} updateBody
 * @returns {Promise<Reservation>}
 */
const updateReservationById = async (reservationid, updateBody) => {
  const Reservation = await database('reservation').where({ reservationid });
  if (!Reservation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reservation not found');
  }
  if (updateBody.workspaceid && (await database('workspace').where({ workspaceid: updateBody.workspaceid })).length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Reservation already taken');
  }
  const updatedReservation = await database('reservation')
    .where({ reservationid })
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
  queryAvailableReservations,
  getReservationById,
  queryReservationByUser,
  updateReservationById,
  deleteReservationById,
};
