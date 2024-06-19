const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const { UserGroup } = require('../models');
const { User } = require('../models');
const userGroup = require('../models/user-group');
const { logger } = require('../shared');

/**
  @desc   Create a group user
  @method POST
  @route  /api/v1/group-users
  @access Private
  @role   Admin
*/
exports.createGroupUserHandler = asyncHandler(async (req, res, _) => {
  const { name, users, permissions, color } = req.body;
  const createdBy = req.user._id; // Assuming you have user information in the request

  const groupUser = await UserGroup.create({ createdBy, name, users, permissions, color });

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
  const groupUsers = await UserGroup.find();

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
  const groupUser = await UserGroup.findById(req.params.id).populate('users');

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
  const { name, users, permissions,color } = req.body;
  const createdBy = req.user._id; // Assuming you have user information in the request

  const groupUser = await UserGroup.findById(req.params.id);

  if (!groupUser) {
    throw new NotFoundException('Group user not found!');
  }

  groupUser.name = name;
  groupUser.users = users;
  groupUser.permissions = permissions;
  groupUser.color=color;

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
  const groupUser = await UserGroup.findById(req.params.id);

  if (!groupUser) {
    throw new NotFoundException('Group user not found!');
  }

  await UserGroup.findByIdAndDelete(req.params.id);

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Deleted group user successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'Deleted group user successfully!',
    data: groupUser,
  });
});
exports.addUserToGroup = asyncHandler(async (req, res) => {
  try {
    const { groupId, userId } = req.body;



    // Find the group by ID
    const group = await userGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    let permissionToUpdate = group.permissions.filter((groupPermission) => !
      user.permissions.includes(groupPermission)
    )
    
    // Add the user to the group's users array if they are not already in it
    if (!group.users.includes(userId)) {
      group.users.push(userId);
      user.permissions=[...user.permissions,permissionToUpdate].flat(2);
      user.group.push(groupId);
      await user.save();
      await group.save();
      return res.status(200).json({ message: 'User added to group successfully', group });
    } else {
      return res.status(400).json({ message: 'User is already in the group' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
})
exports.removeUser = asyncHandler(async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await userGroup.findById(groupId);
    const user = await User.findById(userId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    if (!user) {
      return res.status(404).json({ message: 'USER not found' });
    }

    // Check if the user is in the group's users array
    if (group.users.includes(userId)) {
      // Remove the user from the users array
      group.users.pull(userId);
      user.group.pull(groupId);
      await user.save();
      await group.save();
      return res.status(200).json({ message: 'User removed from group successfully', group });
    } else {
      return res.status(404).json({ message: 'User not found in the group' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
})