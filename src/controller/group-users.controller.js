const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const { GroupUser } = require('../models');
const { logger } = require('../shared');

/**
  @desc   Create a group user
  @method POST
  @route  /api/v1/group-users
  @access Private
  @role   Admin
*/
exports.createGroupUserHandler = asyncHandler(async (req, res, _) => {
  const { createdBy, name, users, permissions } = req.body;

  const groupUser = await GroupUser.create({ createdBy, name, users, permissions });

  logger.info(
    `${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - 'Group user created successfully!' `,
  );
  return res.status(HttpStatus.CREATED).json({
    statusCode: HttpStatus.CREATED,
    message: 'Group user created successfully!',
    data: groupUser,
  });
});

/**
  @desc   Fetch all group users
  @method GET
  @route  /api/v1/group-users
  @access Private
  @role   Admin
*/
exports.getAllGroupUsersHandler = asyncHandler(async (req, res, _) => {
  const groupUsers = await GroupUser.find();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetch group users successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetch group users successfully!',
    data: groupUsers,
  });
});

/**
  @desc   Fetch group user by id
  @param  { id }
  @method GET
  @route  /api/v1/group-users/:id
  @access Private
  @role   Admin
*/
exports.getGroupUserByIdHandler = asyncHandler(async (req, res, _) => {
  const groupUser = await GroupUser.findById(req.params.id);

  if (!groupUser) {
    throw new NotFoundException('Group user not found!');
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetch group user successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Fetch group user successfully!',
    data: groupUser,
  });
});

/**
  @desc   Update group user by id
  @param  { id }
  @method PUT
  @route  /api/v1/group-users/:id
  @access Private
  @role   Admin
*/
exports.updateGroupUserHandler = asyncHandler(async (req, res, _) => {
  const { createdBy, name, users, permissions } = req.body;

  const groupUser = await GroupUser.findById(req.params.id);

  if (!groupUser) {
    throw new NotFoundException('Group user not found!');
  }

  groupUser.createdBy = createdBy;
  groupUser.name = name;
  groupUser.users = users;
  groupUser.permissions = permissions;

  await groupUser.save();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Updated group user successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Updated group user successfully!',
    data: groupUser,
  });
});

/**
  @desc   Delete group user by id
  @param  { id }
  @method DELETE
  @route  /api/v1/group-users/:id
  @access Private
  @role   Admin
*/
exports.deleteGroupUserHandler = asyncHandler(async (req, res, _) => {
  const groupUser = await GroupUser.findById(req.params.id);

  if (!groupUser) {
    throw new NotFoundException('Group user not found!');
  }

  await GroupUser.findByIdAndDelete(req.params.id);

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Deleted group user successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Deleted group user successfully!',
    data: groupUser,
  });
});
