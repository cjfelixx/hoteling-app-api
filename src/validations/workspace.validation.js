const Joi = require('joi');

const createWorkspace = {
  body: Joi.object().keys({
    description: Joi.string(),
  }),
};

const getWorkspaces = {
  query: Joi.object().keys({
    workspaceId: Joi.number(),
    // sortBy: Joi.string(),
    // limit: Joi.number().integer(),
    // page: Joi.number().integer(),
    // populate: join.string(),
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
      isActive: Joi.boolean().required(),
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
