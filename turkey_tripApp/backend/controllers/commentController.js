const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('turkey_tripApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

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
      model: 'blog_posts',
      key: 'id'
    }
  }
}, {
  tableName: 'comments',
  timestamps: false
});

async function getAllComments(req, res) {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId }
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCommentById(req, res) {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createComment(req, res) {
  try {
    const { content, author } = req.body;
    const { postId } = req.params;

    const comment = await Comment.create({ content, author, postId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { content, author } = req.body;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await comment.update({ content, author });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    await comment.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};