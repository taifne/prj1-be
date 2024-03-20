const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const {Question} = require('../models');
const { logger } = require('../shared');

/**
 * @desc   Create a new question
 * @method POST
 * @route  /api/v1/questions
 * @access Private (example: only authenticated users can create)
 */
exports.createQuestion = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user._id; // Assuming user information is available in the request

  const question = await Question.create({
    title,
    body,
    user: userId,
  });

  logger.info(
    `${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - 'Question created successfully!'`
  );

  res.status(HttpStatus.CREATED).json({
    statusCode: HttpStatus.CREATED,
    message: 'Question created successfully!',
    data: question,
  });
});

/**
 * @desc   Get all questions
 * @method GET
 * @route  /api/v1/questions
 * @access Public
 */
exports.getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched all questions successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched all questions successfully!',
    data: questions,
  });
});

/**
 * @desc   Get question by ID
 * @method GET
 * @route  /api/v1/questions/:id
 * @access Public
 */
exports.getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    throw new NotFoundException('Question not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched question successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetched question successfully!',
    data: question,
  });
});

/**
 * @desc   Update question by ID
 * @method PUT
 * @route  /api/v1/questions/:id
 * @access Private
 */
exports.updateQuestion = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const question = await Question.findByIdAndUpdate(req.params.id, {
    title,
    body,
  }, { new: true });

  if (!question) {
    throw new NotFoundException('Question not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Updated question successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Updated question successfully!',
    data: question,
  });
});

/**
 * @desc   Delete question by ID
 * @method DELETE
 * @route  /api/v1/questions/:id
 * @access Private
 */
exports.deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.id);

  if (!question) {
    throw new NotFoundException('Question not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Deleted question successfully!'`
  );

  res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Deleted question successfully!',
    data: question,
  });
});
