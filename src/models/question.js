/* eslint-disable func-names */
const { Schema, model } = require('mongoose');

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    body: {
      type: String,
      required: [true, 'Body is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
      }
    ]
  },
  { timestamps: true },
);

module.exports = model('Question', questionSchema);
