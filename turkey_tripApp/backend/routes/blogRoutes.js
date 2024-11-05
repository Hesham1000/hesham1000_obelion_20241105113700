const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// GET /api/blogPosts/:id - Retrieve a specific blog post by ID
router.get('/api/blogPosts/:id', blogController.getBlogPost);

// POST /api/blogPosts - Create a new blog post
router.post('/api/blogPosts', blogController.createBlogPost);

// PUT /api/blogPosts/:id - Update an existing blog post
router.put('/api/blogPosts/:id', blogController.updateBlogPost);

// DELETE /api/blogPosts/:id - Delete a specific blog post by ID
router.delete('/api/blogPosts/:id', blogController.deleteBlogPost);

module.exports = router;
