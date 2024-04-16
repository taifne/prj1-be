const restRouter = require('express').Router();

const {
  Routes: { AUTH, USER ,STUDY_POST,PERMISSION,GROUP_USER},
} = require('../constants');
const { authRouter } = require('./auth.routes');
const { usersRouter } = require('./users.routes');
const {studyPostRouter}=require('./study.routes');;
const {permissionRouter}=require('./permission.routes');
const {groupUserRouter}=require('./group.routes');
restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(USER.DEFAULT, usersRouter);
restRouter.use(STUDY_POST.DEFAULT,studyPostRouter);
restRouter.use(PERMISSION.DEFAULT,permissionRouter);
restRouter.use(GROUP_USER.DEFAULT,groupUserRouter);
module.exports = { restRouter };
