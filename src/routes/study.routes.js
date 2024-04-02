const studyPostRouter = require('express').Router();

const {
    Routes: { STUDY_POST },
    UserRoles: { ADMIN },
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
const { StudyPost } = require('../models');
const {
    multerService: { uploadUserPhoto, resizeUserPhoto },
} = require('../services');

studyPostRouter
    .route(STUDY_POST.ALL)
    .get(verifyToken, permissionTo(UserPermissions.WRITE), getAllStudyPosts);

studyPostRouter.route(STUDY_POST.CREATE).post(verifyToken, createStudyPost)
studyPostRouter.route(STUDY_POST.DETAIL).get(verifyToken, getStudyPostById)
.post(verifyToken, updateStudyPost)
.delete(verifyToken, deleteStudyPost)
module.exports = { studyPostRouter };
