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
router.route('/workspaces').get(validate(workspaceValidation.getWorkspaces), workspaceController.getWorkspaces);
router.route('/reservations').get(validate(reservationValidation.getReservations), reservationController.getReservations);

module.exports = router;
