const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    replies: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    deletedAt: {
      type: Date,
      default: null
    }
  });
  

  module.exports = model('Comment', commentSchema);

