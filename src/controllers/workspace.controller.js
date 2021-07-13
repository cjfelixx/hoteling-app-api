const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { workspaceService } = require('../services');

const createWorkspace = catchAsync(async (req, res) => {
  const workspace = await workspaceService.createWorkspace(req.body);
  res.status(httpStatus.CREATED).send(workspace);
});

const getWorkspaces = catchAsync(async (req, res) => {
  const result = await workspaceService.queryWorkspaces();
  res.send(result);
});

const getWorkspace = catchAsync(async (req, res) => {
  const workspace = await workspaceService.getWorkspaceById(req.params.workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }
  res.send(workspace);
});

const updateWorkspace = catchAsync(async (req, res) => {
  const workspace = await workspaceService.updateWorkspaceById(req.params.workspaceId, req.body);
  res.send(workspace);
});

const deleteWorkspace = catchAsync(async (req, res) => {
  await workspaceService.deleteWorkspaceById(req.params.workspaceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
