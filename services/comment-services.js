const Comment = require("../models/comment");

exports.createComment = async (task, user, text) => {
  try {
    const newComment = new Comment({ task, user, text });
    return await newComment.save();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Error creating comment: " + error.message);
  }
};
const mongoose = require("mongoose");
exports.listCommentsByTask = async (taskId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(taskId);
    return await Comment.find({ task: objectId }).select("-__v").populate("user", "_id name");
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Error fetching comments: " + error.message);
  }
};
exports.getCommentById = async (commentId) => {
    try {
      return await Comment.findById(commentId).select("-__v").populate("user", "_id name");
    } catch (error) {
      console.error("Error fetching comment:", error);
      throw new Error("Error fetching comment: " + error.message);
    }
  };
  


exports.updateComment = async (id, newText) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { text: newText },
      { new: true, runValidators: true }
    );
    if (!updatedComment) throw new Error("Comment not found");
    return updatedComment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw new Error("Error updating comment: " + error.message);
  }
};

exports.deleteComment = async (commentId) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) throw new Error("Comment not found");
    return deletedComment;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Error deleting comment: " + error.message);
  }
};


exports.listallComments = async (userId, excludeUserId) => {
  try {
    const comments = await Comment.find({ user: { $ne: excludeUserId } }).select("-__v").populate("user", "_id name");
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Error fetching comments: " + error.message);
  }
};