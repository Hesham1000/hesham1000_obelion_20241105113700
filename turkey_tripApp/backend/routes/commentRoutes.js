const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Comment Routes
router.get('/blog-posts/:postId/comments', commentController.getAllComments);
router.get('/comments/:id', commentController.getCommentById);
router.post('/blog-posts/:postId/comments', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;