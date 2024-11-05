const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('turkey_tripApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

const BlogPost = sequelize.define('blog_posts', {
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
  imageUrl: {
    type: DataTypes.STRING
  },
  videoUrl: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'blog_posts',
  timestamps: false
});

const Comment = sequelize.define('comments', {
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
      model: BlogPost,
      key: 'id'
    }
  }
}, {
  tableName: 'comments',
  timestamps: false
});

async function getAllBlogPosts(req, res) {
  try {
    const blogPosts = await BlogPost.findAll();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBlogPostById(req, res) {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (blogPost) {
      res.json(blogPost);
    } else {
      res.status(404).json({ error: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createBlogPost(req, res) {
  try {
    const { title, content, imageUrl, videoUrl } = req.body;
    const newBlogPost = await BlogPost.create({ title, content, imageUrl, videoUrl });
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateBlogPost(req, res) {
  try {
    const { id } = req.params;
    const { title, content, imageUrl, videoUrl } = req.body;

    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await blogPost.update({ title, content, imageUrl, videoUrl });
    res.json(blogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteBlogPost(req, res) {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findByPk(id);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    await blogPost.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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

module.exports = {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllComments,
  createComment
};