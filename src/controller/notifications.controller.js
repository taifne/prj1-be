const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const {Notification} = require('../models');
const { logger } = require('../shared');

/**
 * @desc   Create a new notification
 * @method POST
 * @route  /api/v1/notifications
 * @access Private (example: only authenticated users can create)
 */
exports.createNotification = asyncHandler(async (req, res) => {
  const { userId, message } = req.body;

  const notification = await Notification.create({
    userId,
    message,
  });

  logger.info(
    `${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - 'Notification created successfully!'`
  );

  res.status(HttpStatus.CREATED).json({
    statusCode: HttpStatus.CREATED,
    message: 'Notification created successfully!',
    data: notification,
  });
});

/**
 * @desc   Get all notifications for a user
 * @method GET
 * @route  /api/v1/notifications/:userId
 * @access Private
 */
exports.getNotificationsByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const notifications = await Notification.find({ userId });

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched notifications successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched notifications successfully!',
    data: notifications,
  });
});

/**
 * @desc   Mark notification as read
 * @method PUT
 * @route  /api/v1/notifications/:id/mark-read
 * @access Private
 */
exports.markNotificationAsRead = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;

  const notification = await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });

  if (!notification) {
    throw new NotFoundException('Notification not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Notification marked as read successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Notification marked as read successfully!',
    data: notification,
  });
});

/**
 * @desc   Delete notification by ID
 * @method DELETE
 * @route  /api/v1/notifications/:id
 * @access Private
 */
exports.deleteNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;

  const notification = await Notification.findByIdAndDelete(notificationId);

  if (!notification) {
    throw new NotFoundException('Notification not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Deleted notification successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Deleted notification successfully!',
    data: notification,
  });
});
