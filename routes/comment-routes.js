const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment-controller");



router.post('/create',commentController.createComment);
router.put('/update/:id',commentController.updateComment);
router.delete('/delete/:id', commentController.deleteComment);
router.get('/list', commentController.listComments);
router.get('/list/:id', commentController.getCommentById);
router.get('/list/task/:id', commentController.listCommentsByTask);

module.exports = router;