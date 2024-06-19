const restRouter = require('express').Router();

const {
  Routes: { AUTH, USER, STUDY_POST, PERMISSION, GROUP_USER, COMMENT, QUESTION, EVENT },
} = require('../constants');
const { authRouter } = require('./auth.routes');
const { usersRouter } = require('./users.routes');
const { studyPostRouter } = require('./study.routes');;
const { permissionRouter } = require('./permission.routes');
const { groupUserRouter } = require('./group.routes');
const { commentRoute } = require('./comment.routes');
const { questionRoute } = require('./question.routes');
const { eventRoute } = require('./event.routes');
restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(USER.DEFAULT, usersRouter);
restRouter.use(STUDY_POST.DEFAULT, studyPostRouter);
restRouter.use(PERMISSION.DEFAULT, permissionRouter);
restRouter.use(GROUP_USER.DEFAULT, groupUserRouter);
restRouter.use(COMMENT.DEFAULT, commentRoute);
restRouter.use(QUESTION.DEFAULT, questionRoute);
restRouter.use(EVENT.DEFAULT, eventRoute);
module.exports = { restRouter };
