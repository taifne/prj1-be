const questionRoute = require('express').Router();

const {
    Routes: { QUESTION },
    UserRoles: { ADMIN },
    UserPermissions
} = require('../constants');
const {
    questionsController: {
        createQuestion,
        updateQuestion,
        getAllQuestions,
        getQuestionById,
        deleteQuestion

    },
} = require('../controller');
const { verifyToken, restrictTo, permissionTo } = require('../middleware');
const { Question } = require('../models');
const {
    multerService: { uploadUserPhoto, resizeUserPhoto },
} = require('../services');

questionRoute
    .route(QUESTION.ALL)
    .get(verifyToken, getAllQuestions)
    .post(verifyToken, createQuestion);
questionRoute
    .route(QUESTION.DETAIL)
    .get(verifyToken, getQuestionById)
    .put(verifyToken, updateQuestion)
    .delete(verifyToken, deleteQuestion);


module.exports = { questionRoute };
