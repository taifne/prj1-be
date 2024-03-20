const asyncHandler = require('./async-handler');
const errorHandler = require('./error-handler');
const { restrictTo } = require('./verify-roles');
const { permissionTo } = require('./verify-permission');
const { verifyToken } = require('./verify-token');

module.exports = {
  asyncHandler,
  errorHandler,
  restrictTo,
  verifyToken,
  permissionTo,
};
