const studyPostRouter = require('express').Router();

const {
    Routes: { STUDY_POST },
    UserPermissions
} = require('../constants');
const {
    studyPostsController: {
        getAllStudyPosts,
        getStudyPostById,
        createStudyPost,
        updateStudyPost,
        deleteStudyPost
    },
} = require('../controller');
const { verifyToken, restrictTo, permissionTo } = require('../middleware');
const {
    multerService: { uploadUserPhoto, resizeUserPhoto },
} = require('../services');

studyPostRouter
    .route(STUDY_POST.ALL)
    .get(verifyToken, permissionTo(UserPermissions.READ_POST), getAllStudyPosts);

studyPostRouter.route(STUDY_POST.CREATE).post(verifyToken,permissionTo(UserPermissions.WRITE_POST), createStudyPost)
studyPostRouter.route(STUDY_POST.DETAIL).get(verifyToken,permissionTo(UserPermissions.READ_POST), getStudyPostById)
.post(verifyToken, permissionTo(UserPermissions.UPDATE_POST),updateStudyPost)
.delete(verifyToken, permissionTo(UserPermissions.DELETE_POST),deleteStudyPost)
module.exports = { studyPostRouter };
