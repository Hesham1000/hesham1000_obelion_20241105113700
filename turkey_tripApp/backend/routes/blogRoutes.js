const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentController');

// Blog Post Routes
router.get('/blog-posts', blogController.getAllBlogPosts);
router.get('/blog-posts/:id', blogController.getBlogPostById);
router.post('/blog-posts', blogController.createBlogPost);
router.put('/blog-posts/:id', blogController.updateBlogPost);
router.delete('/blog-posts/:id', blogController.deleteBlogPost);

// Comment Routes
router.get('/blog-posts/:postId/comments', commentController.getAllComments);
router.get('/comments/:id', commentController.getCommentById);
router.post('/blog-posts/:postId/comments', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "db",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "db",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "db",
    "dialect": "mysql"
  }
}

// blogPostModel.js
module.exports = (sequelize, DataTypes) => {
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
    imageUrl: DataTypes.STRING,
    videoUrl: DataTypes.STRING
  }, {});

  BlogPost.associate = function(models) {
    BlogPost.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
  };

  return BlogPost;
};

// commentModel.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlogPost',
        key: 'id'
      }
    }
  }, {});

  Comment.associate = function(models) {
    Comment.belongsTo(models.BlogPost, { foreignKey: 'postId', as: 'blogPost' });
  };

  return Comment;
};