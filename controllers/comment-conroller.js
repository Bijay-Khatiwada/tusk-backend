
exports.listComments = async (req, res) => {
    try {
      const { userId, excludeUserId } = req.query; // Extract userId and excludeUserId from query parameters
      const comments = await commentService.listallComments(userId, excludeUserId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  // Get a comment by specific ID
  exports.getCommentById = async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await commentService.getCommentById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      console.error("Error fetching comment:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Create a new comment
  exports.createComment = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }
  
      const { commentModel, location, price, description, pickupdate, dropoffdate, userId, condition } = req.body;
      const imagePath = `/uploads/${req.file.filename}`;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newComment = await commentService.createComment(
        commentModel,
        location,
        price,
        imagePath,
        description,
        pickupdate,
        dropoffdate,
        userId,
        condition
      );
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a comment
  exports.updateComment = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Comment ID:", id);
  
      const comment = await CommentModel.findById(id);
      if (!comment) {
        console.log("Comment not found.");
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      console.log("Request Body:", req.body);
      console.log("Request File:", req.file);
  
      const { commentModel, location, price, description, pickupdate, dropoffdate, userId, condition } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        console.log("User not found.");
        return res.status(404).json({ message: 'User not found' });
      }
  
  
      const imagePath = req.file ? `/uploads/${req.file.filename}` : comment.image;
      console.log("Image Path:", imagePath);
  
      const updatedComment = await commentService.updateComment(
        id,
        commentModel,
        location,
        price,
        imagePath,
        description,
        pickupdate,
        dropoffdate,
        userId,
        condition
      );
  
      console.log("Updated Comment:", updatedComment);
  
      res.status(200).json(updatedComment);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  // Delete a comment
  exports.deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedComment = await commentService.deleteComment(id);
  
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      res.status(200).json(deletedComment);
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };