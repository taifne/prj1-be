const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const { Event } = require('../models');
const event = require('../models/event');
const { logger } = require('../shared');

/**
 * @desc   Create a new event
 * @method POST
 * @route  /api/v1/events
 * @access Private (example: only authenticated users can create)
 */
exports.createEvent = asyncHandler(async (req, res) => {
  const { title, description, location, start, end ,group} = req.body;

  const event = await Event.create({
    title,
    description,
    location,
    start,
    end,
    group
  });

  logger.info(
    `${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - 'Event created successfully!'`
  );

  res.status(HttpStatus.CREATED).json({
    statusCode: HttpStatus.CREATED,
    message: 'Event created successfully!',
    data: event,
  });
});

/**
 * @desc   Get all events
 * @method GET
 * @route  /api/v1/events
 * @access Public
 */
exports.getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched all events successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched all events successfully!',
    data: events,
  });
});

/**
 * @desc   Get event by ID
 * @method GET
 * @route  /api/v1/events/:id
 * @access Public
 */
exports.getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new NotFoundException('Event not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched event successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched event successfully!',
    data: event,
  });
});

/**
 * @desc   Update event by ID
 * @method PUT
 * @route  /api/v1/events/:id
 * @access Private
 */
exports.updateEvent = asyncHandler(async (req, res) => {
  const { title, description, location, start, end } = req.body;

  const event = await Event.findByIdAndUpdate(req.params.id, {
    title,
    description,
    location,
    start,
    end,
  }, { new: true });

  if (!event) {
    throw new NotFoundException('Event not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Updated event successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Updated event successfully!',
    data: event,
  });
});

/**
 * @desc   Delete event by ID
 * @method DELETE
 * @route  /api/v1/events/:id
 * @access Private
 */
exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    throw new NotFoundException('Event not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Deleted event successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Deleted event successfully!',
    data: event,
  });
});
 exports.getEventByGroup=asyncHandler(async (req, res) => {
  try {
    const { groupIds } = req.body;



    // Find events that include any of the groupIds
    const events = await event.find({ group: { $in: groupIds } }).distinct('_id');

    // Populate the events with their full details
    const fullEvents = await event.find({ _id: { $in: events } }).populate('group');

    return res.status(200).json({ events: fullEvents });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
 })