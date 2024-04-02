const { Schema, model } = require('mongoose');

const permissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Permission', permissionSchema);
