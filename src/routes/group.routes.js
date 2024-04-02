const groupUserRouter = require('express').Router();

const {
    Routes: { GROUP_USER },
    UserRoles: { ADMIN },
    UserPermissions
} = require('../constants');
const {
    groupsController: {
        getAllGroupUsersHandler,
        getGroupUserByIdHandler,
        createGroupUserHandler,
        updateGroupUserHandler,
        deleteGroupUserHandler
    },
} = require('../controller');
const { verifyToken, restrictTo, permissionTo } = require('../middleware');

const {
    multerService: { uploadUserPhoto, resizeUserPhoto },
} = require('../services');

groupUserRouter
    .route(GROUP_USER.ALL)
    .get(verifyToken, permissionTo(UserPermissions.READ_GROUP), getAllGroupUsersHandler)
    .post(verifyToken,permissionTo(UserPermissions.WRITE_GROUP),createGroupUserHandler)
    ;

 groupUserRouter.route(GROUP_USER.DETAIL)
    .get(verifyToken,permissionTo(UserPermissions.READ_GROUP), getGroupUserByIdHandler)
.post(verifyToken,permissionTo(UserPermissions.WRITE_GROUP), updateGroupUserHandler)
.delete(verifyToken,permissionTo(UserPermissions.DELETE_GROUP) ,deleteGroupUserHandler)
module.exports = { studyPostRouter };
