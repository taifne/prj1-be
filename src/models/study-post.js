/* eslint-disable func-names */
const { Schema, model } = require('mongoose');

const studyPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    startDay: {
      type: Date,
      required: true,
    },
    endDay: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model('StudyPost', studyPostSchema);
