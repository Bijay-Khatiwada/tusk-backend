const commentService = require("../services/comment-services");

exports.createComment = async (req, res) => {
  try {
    const { task, user, text } = req.body;
    const newComment = await commentService.createComment(task, user, text);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment", message: error.message });
  }
};

exports.listCommentsByTask = async (req, res) => {
  try {
    console.log("Fetching comments for task ID:", req.params.id);
    const comments = await commentService.listCommentsByTask(req.params.id);
    console.log("Comments found:", comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments", message: error.message });
  }
};
exports.getCommentById = async (req, res) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comment", message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await commentService.updateComment(req.params.id, req.body.text);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment", message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await commentService.deleteComment(req.params.id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment", message: error.message });
  }
};


exports.listComments = async (req, res) => {
  try {
    const comments = await commentService.listallComments(req.query.userId, req.query.excludeUserId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments", message: error.message });
  }
};