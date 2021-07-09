const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({}),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      firstName: Joi.string(),
      lastName: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
