const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const keysToCamel = require('../utils/keysToCamel');
const keysToSnake = require('../utils/keysToSnake');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // check that user with email doesn't already exist - BAD_REQUEST

  // insert new user into database and return new user

  return null;
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  // get all users

  return null;
};

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  // get user by ID

  return null;
};

/**
 * Update user by id
 * @param {number} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (id, updateBody) => {
  // check that user exists - NOT_FOUND

  // if email is included in updateBody, check that email isn't already taken - BAD_REQUEST

  // update the user record and return updated user

  return null;
};

/**
 * Delete user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
const deleteUserById = async (id) => {
  // check that user exists - NOT_FOUND

  // delete user by ID and return deleted user

  return null;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
