const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const {StudyPost} = require('../models');
const { logger } = require('../shared');

/**
 * @desc   Create a new study post
 * @method POST
 * @route  /api/v1/study-posts
 * @access Private (example: only authenticated users can create)
 */
exports.createStudyPost = asyncHandler(async (req, res) => {
  const { title, description, link, startDay, endDay, image } = req.body;
  const createdBy = req.user._id; // Assuming you have user information in the request

  const studyPost = await StudyPost.create({
    title,
    description,
    link,
    startDay,
    endDay,
    createdBy,
    image,
  });

  logger.info(
    `${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - 'Study post created successfully!'`
  );

  res.status(HttpStatus.CREATED).json({
    statusCode: HttpStatus.CREATED,
    message: 'Study post created successfully!',
    data: studyPost,
  });
});

/**
 * @desc   Get all study posts
 * @method GET
 * @route  /api/v1/study-posts
 * @access Public
 */
exports.getAllStudyPosts = asyncHandler(async (req, res) => {
  const studyPosts = await StudyPost.find();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched all study posts successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched all study posts successfully!',
    data: studyPosts,
  });
});

/**
 * @desc   Get study post by ID
 * @method GET
 * @route  /api/v1/study-posts/:id
 * @access Public
 */
exports.getStudyPostById = asyncHandler(async (req, res) => {
  const studyPost = await StudyPost.findById(req.params.id);

  if (!studyPost) {
    throw new NotFoundException('Study post not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched study post successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched study post successfully!',
    data: studyPost,
  });
});

/**
 * @desc   Update study post by ID
 * @method PUT
 * @route  /api/v1/study-posts/:id
 * @access Private
 */
exports.updateStudyPost = asyncHandler(async (req, res) => {
  const { title, description, link, startDay, endDay, image } = req.body;

  const studyPost = await StudyPost.findByIdAndUpdate(req.params.id, {
    title,
    description,
    link,
    startDay,
    endDay,
    image,
  }, { new: true });

  if (!studyPost) {
    throw new NotFoundException('Study post not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Updated study post successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Updated study post successfully!',
    data: studyPost,
  });
});

/**
 * @desc   Delete study post by ID
 * @method DELETE
 * @route  /api/v1/study-posts/:id
 * @access Private
 */
exports.deleteStudyPost = asyncHandler(async (req, res) => {
  const studyPost = await StudyPost.findByIdAndDelete(req.params.id);

  if (!studyPost) {
    throw new NotFoundException('Study post not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Deleted study post successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Deleted study post successfully!',
    data: studyPost,
  });
});
