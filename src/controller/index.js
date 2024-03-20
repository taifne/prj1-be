const authController = require('./auth.controller');
const usersController = require('./users.controller');
const answersController = require('./answers.controller');
const eventsController = require('./events.controller');
const groupsController = require('./group-users.controller');
const notificationsController = require('./notifications.controller');
const questionsController = require('./questions.controller');
const recruitmentController = require('./recruitments.controller');
const studyPostsController = require('./study-posts.controller');
module.exports = {
    authController,
    usersController,
    answersController,
    eventsController,
    groupsController,
    notificationsController,
    questionsController,
    recruitmentController,
    studyPostsController
};
