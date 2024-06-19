const commentRoute = require('express').Router();

const {
    Routes: { COMMENT },
    UserRoles: { ADMIN },
    UserPermissions,
    Routes
} = require('../constants');
const {
    commentsController: {
        createAnswer,
        removecomment,
        getCommentForQuestion,updateAComment
    }
} = require('../controller');
const { verifyToken, restrictTo, permissionTo } = require('../middleware');

const {
    multerService: { uploadUserPhoto, resizeUserPhoto },
} = require('../services');

// commentRoute
//     .route(Routes.COMMENT.ALL)
//     .get(verifyToken, getAllGroupUsersHandler)
//     .post(verifyToken,permissionTo(UserPermissions.WRITE_GROUP),createGroupUserHandler)
//     ;

commentRoute.route(Routes.COMMENT.CREATE)
    .post(verifyToken, createAnswer)
commentRoute.route(COMMENT.ALLFORQUESTION).get(verifyToken, getCommentForQuestion)
commentRoute.route(COMMENT.DETAIL).delete(verifyToken, removecomment)
.patch(verifyToken,updateAComment)
;
module.exports = { commentRoute };
