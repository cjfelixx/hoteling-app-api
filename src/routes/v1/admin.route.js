const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const workspaceValidation = require('../../validations/workspace.validation');
const workspaceController = require('../../controllers/workspace.controller');
const reservationValidation = require('../../validations/reservation.validation');
const reservationController = require('../../controllers/reservation.controller');

const router = express.Router();

router.route('/users').get(validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .post(validate(userValidation.updateUser))
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

router
  .route('/workspaces')
  .get(validate(workspaceValidation.getWorkspaces), workspaceController.getWorkspaces)
  .post(validate(workspaceValidation.createWorkspace), workspaceController.createWorkspace);

router
  .route('/:workspaceId')
  .get(validate(workspaceValidation.getWorkspace), workspaceController.getWorkspace)
  .patch(validate(workspaceValidation.updateWorkspace), workspaceController.updateWorkspace)
  .delete(validate(workspaceValidation.deleteWorkspace), workspaceController.deleteWorkspace);

router
  .route('/reservations')
  .post(validate(workspaceValidation.createWorkspace), workspaceController.createWorkspace)
  .get(validate(reservationValidation.getReservations), reservationController.getReservations);

router
  .route('/:reservationId')
  .get(validate(reservationValidation.getReservation), reservationController.getReservation)
  .patch(validate(reservationValidation.updateReservation), reservationController.updateReservation)
  .delete(validate(reservationValidation.deleteReservation), reservationController.deleteReservation);

module.exports = router;
