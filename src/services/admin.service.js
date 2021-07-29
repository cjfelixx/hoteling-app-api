const moment = require('moment');
const database = require('../config/knex');
const keysToCamel = require('../utils/keysToCamel');

/**
 * Query for Reservations
 * @returns {Promise<QueryResult>}
 */
const queryNewBookings = async () => {
  const now = new Date();
  const newNow = moment(now).set({ h: 0, m: 0, s: 0 });
  // console.log(now.setHours(0,0,0,0))
  const Reservations = await database('reservation')
    .innerJoin('user', 'reservation.userid', 'user.userid')
    .where('reservation.updated_at', '>=', newNow.toISOString())
    .select([
      'reservation.reservationid',
      'reservation.workspaceid',
      'user.first_name',
      'user.last_name',
      'reservation.start_date',
      'reservation.end_date',
      'reservation.created_at',
      'reservation.updated_at',
    ]);
  return keysToCamel(Reservations);
};

const queryUsersToday = async () => {
  const now = new Date();
  const newNow = moment(now).set({ h: 0, m: 0, s: 0 });
  const Reservations = await database('user')
    .innerJoin('reservation', 'user.userid', 'reservation.userid')
    .where('reservation.start_date', '>=', newNow.toISOString())
    .andWhere('reservation.end_date', '<=', newNow.toISOString())
    .distinct(['user.first_name', 'user.last_name']);
  return keysToCamel(Reservations);
};

const queryWeeklyBookings = async () => {
  const from = moment().startOf('week').toISOString();
  const to = moment().endOf('week').toISOString();

  const Reservations = await database('user')
    .innerJoin('reservation', 'user.userid', 'reservation.userid')
    .where('reservation.start_date', '>=', from)
    .andWhere('reservation.start_date', '<=', to)
    .select([
      'reservation.reservationid',
      'reservation.workspaceid',
      'user.first_name',
      'user.last_name',
      'reservation.start_date',
      'reservation.end_date',
      'reservation.created_at',
      'reservation.updated_at',
    ]);
  return keysToCamel(Reservations);
};
module.exports = { queryNewBookings, queryUsersToday, queryWeeklyBookings };
