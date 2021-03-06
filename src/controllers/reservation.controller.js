const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
// const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { reservationService } = require('../services');

const createReservation = catchAsync(async (req, res) => {
  const reservation = await reservationService.createReservation(req.body);
  res.status(httpStatus.CREATED).send(reservation);
});

const getReservations = catchAsync(async (req, res) => {
  const result = await reservationService.queryReservations();
  res.send(result);
});

const getUserReservations = catchAsync(async (req, res) => {
  const result = await reservationService.queryReservationByUser(req.params.userId);
  res.send(result);
});

const getAvailableReservations = catchAsync(async (req, res) => {
  const result = await reservationService.queryAvailableReservations(req.body);
  res.send(result);
});

const getReservation = catchAsync(async (req, res) => {
  const reservation = await reservationService.getReservationById(req.params.reservationId);
  if (!reservation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reservation not found');
  }
  res.send(reservation);
});

const updateReservation = catchAsync(async (req, res) => {
  const reservation = await reservationService.updateReservationById(req.params.reservationId, req.body);
  res.send(reservation);
});

const deleteReservation = catchAsync(async (req, res) => {
  await reservationService.deleteReservationById(req.params.reservationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReservation,
  getReservations,
  getUserReservations,
  getAvailableReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
