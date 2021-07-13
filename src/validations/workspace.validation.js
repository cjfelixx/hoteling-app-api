const Joi = require('joi');
const { join } = require('lodash');

const createWorkspace = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    workspaceId: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
};

const getWorkspaces = {
  query: Joi.object().keys({
    workspaceId: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: join.string(),
  }),
};

const getWorkspace = {
  params: Joi.object().keys({
    workspaceId: Joi.number(),
  }),
};

const updateWorkspace = {
  params: Joi.object().keys({
    workspaceId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      workspaceId: Joi.number(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
    .min(1),
};

const deleteWorkspace = {
  params: Joi.object().keys({
    workspaceId: Joi.number(),
  }),
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
