/* eslint-disable func-names */
const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
    group: [{
      type: Schema.Types.ObjectId,
      ref: 'GroupUser',
      required: true
    }],
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('Event', eventSchema);
