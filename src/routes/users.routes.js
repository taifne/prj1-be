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
const { verifyToken, restrictTo,permissionTo} = require('../middleware');
const {
  multerService: { uploadUserPhoto, resizeUserPhoto },
} = require('../services');

usersRouter
  .route(USER.ALL)
  .get(verifyToken, permissionTo(UserPermissions.WRITE), getAllUserHandler);
usersRouter
  .route(USER.DETAIL)
  .get(verifyToken, restrictTo(ADMIN), getUserByIdHandler)
  .put(
    verifyToken,
    restrictTo(ADMIN),
    uploadUserPhoto,
    resizeUserPhoto,
    updateUserHandler,
  )
  .delete(verifyToken, restrictTo(ADMIN), deleteUserHandler);

module.exports = { usersRouter };
