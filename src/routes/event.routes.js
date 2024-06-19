const eventRoute = require('express').Router();

const {
    Routes: { EVENT },
    UserRoles: { ADMIN },
    UserPermissions,
    Routes
} = require('../constants');
const {
    eventsController: {
        getAllEvents,
        getEventById,
        updateEvent,
        createEvent,
        deleteEvent,
        getEventByGroup
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

eventRoute.route(EVENT.ALL)
    .get(verifyToken, getAllEvents)
    .post(verifyToken, createEvent)
eventRoute.route(EVENT.DETAIL).get(verifyToken, getEventById)
    .put(verifyToken, updateEvent).delete(verifyToken, deleteEvent);
    eventRoute.route(EVENT.GETBYGROUP).post(verifyToken,getEventByGroup);
module.exports = { eventRoute };
