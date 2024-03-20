const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const {Recruitment} = require('../models');
const { logger } = require('../shared');

/**
 * @desc   Create a new recruitment
 * @method POST
 * @route  /api/v1/recruitments
 * @access Private (example: only authenticated users can create)
 */
exports.createRecruitment = asyncHandler(async (req, res) => {
  const { title, description, location, startDay, endDay, createdBy, link, image } = req.body;

  const recruitment = await Recruitment.create({
    title,
    description,
    location,
    startDay,
    endDay,
    createdBy,
    link,
    image,
  });

  logger.info(
    `${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - 'Recruitment created successfully!'`
  );

  res.status(HttpStatus.CREATED).json({
    statusCode: HttpStatus.CREATED,
    message: 'Recruitment created successfully!',
    data: recruitment,
  });
});

/**
 * @desc   Get all recruitments
 * @method GET
 * @route  /api/v1/recruitments
 * @access Public
 */
exports.getAllRecruitments = asyncHandler(async (req, res) => {
  const recruitments = await Recruitment.find();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched all recruitments successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched all recruitments successfully!',
    data: recruitments,
  });
});

/**
 * @desc   Get recruitment by ID
 * @method GET
 * @route  /api/v1/recruitments/:id
 * @access Public
 */
exports.getRecruitmentById = asyncHandler(async (req, res) => {
  const recruitment = await Recruitment.findById(req.params.id);

  if (!recruitment) {
    throw new NotFoundException('Recruitment not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched recruitment successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched recruitment successfully!',
    data: recruitment,
  });
});

/**
 * @desc   Update recruitment by ID
 * @method PUT
 * @route  /api/v1/recruitments/:id
 * @access Private
 */
exports.updateRecruitment = asyncHandler(async (req, res) => {
  const { title, description, location, startDay, endDay, link, image } = req.body;

  const recruitment = await Recruitment.findByIdAndUpdate(req.params.id, {
    title,
    description,
    location,
    startDay,
    endDay,
    link,
    image,
  }, { new: true });

  if (!recruitment) {
    throw new NotFoundException('Recruitment not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Updated recruitment successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Updated recruitment successfully!',
    data: recruitment,
  });
});

/**
 * @desc   Delete recruitment by ID
 * @method DELETE
 * @route  /api/v1/recruitments/:id
 * @access Private
 */
exports.deleteRecruitment = asyncHandler(async (req, res) => {
  const recruitment = await Recruitment.findByIdAndDelete(req.params.id);

  if (!recruitment) {
    throw new NotFoundException('Recruitment not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Deleted recruitment successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Deleted recruitment successfully!',
    data: recruitment,
  });
});
