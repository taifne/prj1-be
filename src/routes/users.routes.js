const usersRouter = require('express').Router();
const {
  Routes: { USER },
  UserRoles: { ADMIN },
  UserPermissions
} = require('../constants');
const {
  usersController: {
    getAllUserHandler,
    getUserByIdHandler,
    updateUserHandler,
    deleteUserHandler,
  },
} = require('../controller');
const { verifyToken, restrictTo, permissionTo } = require('../middleware');
const {
  multerService: { uploadUserPhoto, resizeUserPhoto },
} = require('../services');

// Middleware for all routes
usersRouter.use(verifyToken);

// Routes for getting all users
usersRouter.get(USER.ALL, permissionTo(UserPermissions.READ_USER), getAllUserHandler);

// Routes for getting, updating, and deleting a user by ID (admin only)
usersRouter.route(USER.DETAIL)
  .get(restrictTo(ADMIN), permissionTo(UserPermissions.READ_USER), getUserByIdHandler)
  .put(restrictTo(ADMIN), uploadUserPhoto, resizeUserPhoto, updateUserHandler)
  .delete(restrictTo(ADMIN), deleteUserHandler);

module.exports = { usersRouter };
