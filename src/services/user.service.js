const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');
const database = require('../config/knex');
const keysToCamel = require('../utils/keysToCamel');
const keysToSnake = require('../utils/keysToSnake');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const foundUser = await database('user').where({ email: userBody.email });
  if (foundUser.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const now = new Date();

  // const password = await bcrypt.hash(userBody.password,10)
  const user = await database('user')
    .insert({
      ...keysToSnake(userBody),
      password: await bcrypt.hash(userBody.password, 10),
      created_at: now,
      updated_at: now,
    })
    .returning('*');
  return keysToCamel(user);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  // TODO: Add pagination
  const users = await database('user').select('*');
  return keysToCamel(users);
};

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
const getUserById = async (userid) => {
  const user = await database('user').where({ userid }).select('*');
  return keysToCamel(user);
};

const getUserByEmail = async (email) => {
  const user = await database('user').where({ email }).select('*');
  return keysToCamel(user);
};

/**
 * Update user by id
 * @param {number} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (id, updateBody) => {
  const user = await database('user').where({ id });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await database('user').where({ email: updateBody.email })).length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const updatedUser = await database('user')
    .where({ id })
    .update({
      ...keysToSnake(updateBody),
      updated_at: new Date(),
    })
    .returning('*');
  return keysToCamel(updatedUser);
};

/**
 * Delete user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
const deleteUserById = async (userid) => {
  const user = await database('user').where({ userid });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await database('user').where({ userid }).del();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
