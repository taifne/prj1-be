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
    color: {
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
          UserPermissions.READ_POST,
          UserPermissions.UPDATE_POST,
          UserPermissions.DELETE_POST,
          UserPermissions.WRITE_POST,
          UserPermissions.READ_USER,
          UserPermissions.UPDATE_USER,
          UserPermissions.WRITE_USER,
          UserPermissions.DELETE_USER,
          UserPermissions.READ_GROUP,
          UserPermissions.UPDATE_GROUP,
          UserPermissions.WRITE_GROUP,
          UserPermissions.DELETE_GROUP,
        ],
      }
    ],
  },
  { timestamps: true },
);

module.exports = model('GroupUser', groupUserSchema);
