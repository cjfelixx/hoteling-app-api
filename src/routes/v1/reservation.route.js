const express = require('express');
const validate = require('../../middlewares/validate');
const reservationValidation = require('../../validations/reservation.validation');
const reservationController = require('../../controllers/reservation.controller');

const router = express.Router();

router.route('/').post(validate(reservationValidation.createReservation), reservationController.createReservation);

router
  .route('/schedule')
  .post(validate(reservationValidation.getAvailableReservations), reservationController.getAvailableReservations);

router
  .route('/:reservationId')
  .get(validate(reservationValidation.getReservation), reservationController.getReservation)
  .patch(validate(reservationValidation.updateReservation), reservationController.updateReservation)
  .delete(validate(reservationValidation.deleteReservation), reservationController.deleteReservation);

module.exports = router;
