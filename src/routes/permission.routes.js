const permissionRouter = require('express').Router();

const {
    Routes: { PERMISSION },
    UserRoles: { ADMIN },
    UserPermissions
} = require('../constants');
const {
    permissionController: {
    getAllPermissionsHandler,
    createPermissionHandler
    },
} = require('../controller');
const { verifyToken, restrictTo, permissionTo } = require('../middleware');
const { StudyPost } = require('../models');
const {
    multerService: { uploadUserPhoto, resizeUserPhoto },
} = require('../services');

permissionRouter
    .route(PERMISSION.ALL)
    .get(verifyToken, permissionTo(UserPermissions.READ_POST), getAllPermissionsHandler)
    .post(verifyToken,permissionTo(UserPermissions.WRITE_POST),createPermissionHandler);

module.exports = { permissionRouter };
