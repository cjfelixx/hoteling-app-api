const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { reservationService } = require('../services');

const createReservation = catchAsync(async (req, res) => {
  const reservation = await reservationService.createReservation(req.body);
  res.status(httpStatus.CREATED).send(reservation);
});

const getReservations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await reservationService.queryReservations(filter, options);
  res.send(result);
});

const getReservation = catchAsync(async (req, res) => {
  const Reservation = await reservationService.getReservationById(req.params.ReservationId);
  if (!Reservation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reservation not found');
  }
  res.send(Reservation);
});

const updateReservation = catchAsync(async (req, res) => {
  const Reservation = await reservationService.updateReservationById(req.params.ReservationId, req.body);
  res.send(Reservation);
});

const deleteReservation = catchAsync(async (req, res) => {
  await reservationService.deleteReservationById(req.params.ReservationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
