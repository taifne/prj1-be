const { Schema, model } = require('mongoose');
const { UserPermissions } = require('../constants');

const groupUserSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    permissions: [
      {
        type: String,
        enum: [
          UserPermissions.CREATE_POST,
          UserPermissions.DELETE,
          UserPermissions.WRITE,
          UserPermissions.READ
        ],
      }
    ],
  },
  { timestamps: true },
);

module.exports = model('GroupUser', groupUserSchema);
