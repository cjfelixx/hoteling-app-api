const catchAsync = require('../utils/catchAsync');
const { adminService } = require('../services');

const getNewBookings = catchAsync(async (req, res) => {
  const result = await adminService.queryNewBookings();
  res.send(result);
});

const getUsersToday = catchAsync(async (req, res) => {
  const result = await adminService.queryUsersToday();
  res.send(result);
});

const getWeeklyBookings = catchAsync(async (req, res) => {
  const result = await adminService.queryWeeklyBookings();
  res.send(result);
});

module.exports = {
  getNewBookings,
  getUsersToday,
  getWeeklyBookings,
};
