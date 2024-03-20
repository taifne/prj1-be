const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const { Answer } = require('../models');
const { logger } = require('../shared');

/**
 * @desc   Create a new answer
 * @method POST
 * @route  /api/v1/answers
 * @access Private (example: only authenticated users can create)
 */
exports.createAnswer = asyncHandler(async (req, res) => {
    const { body, questionId } = req.body;
    const userId = req.user._id; // Assuming user information is available in the request

    const answer = await Answer.create({
        body,
        user: userId,
        question: questionId,
    });

    logger.info(
        `${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - 'Answer created successfully!'`
    );

    res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Answer created successfully!',
        data: answer,
    });
});

/**
 * @desc   Get all answers
 * @method GET
 * @route  /api/v1/answers
 * @access Public
 */
exports.getAllAnswers = asyncHandler(async (req, res) => {
    const answers = await Answer.find();

    logger.info(
        `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched all answers successfully!'`
    );

    res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Fetched all answers successfully!',
        data: answers,
    });
});

/**
 * @desc   Get answer by ID
 * @method GET
 * @route  /api/v1/answers/:id
 * @access Public
 */
exports.getAnswerById = asyncHandler(async (req, res) => {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
        throw new NotFoundException('Answer not found!');
    }

    logger.info(
        `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetched answer successfully!'`
    );

    res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Fetched answer successfully!',
        data: answer,
    });
});

/**
 * @desc   Update answer by ID
 * @method PUT
 * @route  /api/v1/answers/:id
 * @access Private
 */
exports.updateAnswer = asyncHandler(async (req, res) => {
    const { body } = req.body;

    const answer = await Answer.findByIdAndUpdate(req.params.id, {
        body,
    }, { new: true });

    if (!answer) {
        throw new NotFoundException('Answer not found!');
    }

    logger.info(
        `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Updated answer successfully!'`
    );

    res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Updated answer successfully!',
        data: answer,
    });
});

/**
 * @desc   Delete answer by ID
 * @method DELETE
 * @route  /api/v1/answers/:id
 * @access Private
 */
exports.deleteAnswer = asyncHandler(async (req, res) => {
    const answer = await Answer.findByIdAndDelete(req.params.id);

    if (!answer) {
        throw new NotFoundException('Answer not found!');
    }

    logger.info(
        `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Deleted answer successfully!'`
    );

    res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Deleted answer successfully!',
        data: answer,
    });
});
