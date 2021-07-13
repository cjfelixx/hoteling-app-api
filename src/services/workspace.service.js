const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const database = require('../config/knex');
const keysToCamel = require('../utils/keysToCamel');
const keysToSnake = require('../utils/keysToSnake');

/**
 * Create a Workspace
 * @param {Object} worskspaceBody
 * @returns {Promise<Workspace>}
 */
const createWorkspace = async (worskspaceBody) => {
  const workspace = await database('workspace')
    .insert({
      ...keysToSnake(worskspaceBody),
    })
    .returning('*');
  return keysToCamel(workspace);
};

/**
 * Query for Workspaces
 * @returns {Promise<QueryResult>}
 */
const queryWorkspaces = async () => {
  // TODO: Add pagination
  const workspaces = await database('workspace').select('*');
  return keysToCamel(workspaces);
};

/**
 * Get Workspace by id
 * @param {number} id
 * @returns {Promise<Workspace>}
 */
const getWorkspaceById = async (workspaceid) => {
  const workspace = await database('workspace').where({ workspaceid }).select('*');
  return keysToCamel(workspace);
};

/**
 * Update Workspace by id
 * @param {number} workspaceid
 * @param {Object} updateBody
 * @returns {Promise<Workspace>}
 */
const updateWorkspaceById = async (workspaceid, updateBody) => {
  const workspace = await database('workspace').where({ workspaceid });
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }
  const updatedWorkspace = await database('workspace')
    .where({ workspaceid })
    .update({
      ...keysToSnake(updateBody),
    })
    .returning('*');
  return keysToCamel(updatedWorkspace);
};

/**
 * Delete Workspace by id
 * @param {number} id
 * @returns {Promise<Workspace>}
 */
const deleteWorkspaceById = async (workspaceid) => {
  const workspace = await database('workspace').where({ workspaceid });
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }
  await database('workspace').where({ workspaceid }).del();
  return workspace;
};

module.exports = {
  createWorkspace,
  queryWorkspaces,
  getWorkspaceById,
  updateWorkspaceById,
  deleteWorkspaceById,
};
