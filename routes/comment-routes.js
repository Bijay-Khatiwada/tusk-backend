const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment-controller");
const upload = require("../multer");
const { isAdmin } = require("../middleware/middleware");

router.post('/create', upload.single('image'), commentController.createComment);

router.put('/update/:id', upload.single('image'), commentController.updateComment);

router.delete('/delete/:id', commentController.deleteComment);
router.get('/list', commentController.listComments);
router.get('/list/:id', commentController.getCommentById);

//admin comment routes
router.delete("/admin/delete-comment/:id", isAdmin, commentController.deleteComment); //  Delete comment
router.put("/admin/update-comment/:id", isAdmin, upload.single('image'), commentController.updateComment); // 

module.exports = router;