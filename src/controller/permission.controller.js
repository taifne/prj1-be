const { HttpStatus } = require('../constants');
const Permission = require('../models/permission'); // Adjust the import path if necessary
const { logger } = require('../shared');

/**
 * Fetch all permissions
 * @method GET
 * @route  /api/v1/permissions
 * @access Private
 * @role   Admin
 */
exports.getAllPermissionsHandler = async (req, res, next) => {
  try {
    // Fetch all permissions from the database
    const permissions = await Permission.find();

    // Log the successful fetch
    logger.info(`${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetch permissions successfully!' `);

    // Send response with the fetched permissions
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Fetch permissions successfully!',
      data: permissions,
    });
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};


/**
 * Create a new permission
 * @method POST
 * @route  /api/v1/permissions
 * @access Private
 * @role   Admin
 */
exports.createPermissionHandler = async (req, res, next) => {
    try {
      // Extract permission data from request body
      const { name, value, description } = req.body;
  
      // Create a new permission instance
      const newPermission = new Permission({
        name,
        value,
        description,
      });
  
      // Save the new permission to the database
      const createdPermission = await newPermission.save();
  
      // Log successful creation
      logger.info(`${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - 'Permission created successfully!' `);
  
      // Send response with the created permission
      res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Permission created successfully!',
        data: createdPermission,
      });
    } catch (error) {
      // Pass error to error handling middleware
      next(error);
    }
};
