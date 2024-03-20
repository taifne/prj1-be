const { ErrorMessage } = require('../constants');
const { ForbiddenException } = require('../errors');

const permissionTo =
  (...permission) =>
  (req, _, next) => {
   
    const { permissions } = req.user;
    if (!permissions.includes(permission)) {
      throw new ForbiddenException(ErrorMessage.PERMISSION_DENIED);
    }
    return next();
  };

module.exports = { permissionTo };
