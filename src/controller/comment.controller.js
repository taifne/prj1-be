const { HttpStatus } = require('../constants');
const { NotFoundException } = require('../errors');
const { asyncHandler } = require('../middleware');
const { Question, Comment, User } = require('../models');
const comment = require('../models/comment');

exports.createAnswer = asyncHandler(async (req, res) => {
    try {
        const { content, parentId, questionId } = req.body;
        const userId = req.user._id;

        // Validate if post and user exist
        const question = await Question.findById(questionId);

        const user = await User.findById(userId);

        if (!question) {
            return res.status(400).json({ message: 'Q not found' });
        }
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const comment = new Comment({
            content,
            parentId,
            question: questionId,
            user: userId,
            createdAt: new Date()
        });

        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.removecomment = asyncHandler(async (req, res) => {

    try {
        const deletedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { deletedAt: new Date() },
            { new: true }
        );
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted', deletedComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})
exports.getCommentForQuestion = asyncHandler(async (req, res) => {
    try {
        const ListComments = await Comment.find({ question: req.params.id });
      
        res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Fetched all events successfully!',
            data: buildCommentTree(ListComments),
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})
exports.updateAComment=asyncHandler(async (req,res) => {

    try {
        const updateCommentDto = req.body;
      const commentToUpdate = await comment.findById(req/params.id).populate('likes').exec();
  
      if (!commentToUpdate) {
        throw new Error('Comment not found');
      }
  
      if (updateCommentDto.likes !== undefined) {
        const usersToLike = await User.find({ id: { $in: updateCommentDto.likes } });
        commentToUpdate.likes = usersToLike.map(user => user._id);
      }
  
      if (updateCommentDto.content !== undefined) {
        commentToUpdate.content = updateCommentDto.content;
      }
  
      if (updateCommentDto.parentId !== undefined) {
        commentToUpdate.parentId = updateCommentDto.parentId;
      }
  
      const updatedComment = await commentToUpdate.save();
  
      return updatedComment;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw new Error('Could not update comment');
    }
  
})
function buildCommentTree(comments) {
    const commentMap = new Map();
    const rootComments = [];

    comments.forEach(comment => {
        comment.replies = [];
        commentMap.set(comment.id, comment);
        if (!comment.parentId) {
            rootComments.push(comment);
        }
    });

    comments.forEach(comment => {
        if (comment.parentId) {

            const parentComment = commentMap.get(comment.parentId.toString());
            if (parentComment) {

                parentComment.replies.push(comment);
            }
        }
    });

    return rootComments;
}