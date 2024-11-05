const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Create a new blog post
router.post('/posts', blogController.createPost);

// Save a draft
router.put('/drafts', blogController.saveDraft);

// Publish a post
router.put('/publish', blogController.publishPost);

// Get all published posts
router.get('/posts', blogController.getPosts);

// Get all drafts
router.get('/drafts', blogController.getDrafts);

module.exports = router;

Make sure the model file is updated as follows:

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db',
  dialect: 'mysql'
});

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tags: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
    allowNull: false
  }
}, {
  tableName: 'blog_posts'
});

module.exports = BlogPost;