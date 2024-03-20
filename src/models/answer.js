/* eslint-disable func-names */
const { Schema, model } = require('mongoose');

const answerSchema = new Schema(
  {
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
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('Answer', answerSchema);
