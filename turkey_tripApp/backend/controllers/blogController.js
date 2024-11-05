const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('turkey_tripApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    allowNull: false,
    defaultValue: 'draft',
  },
}, {
  tableName: 'blog_posts',
  timestamps: false,
});

exports.createPost = async (req, res) => {
  const { title, content, tags, location, date } = req.body;
  try {
    const newPost = await BlogPost.create({
      title,
      content,
      tags,
      location,
      date,
      status: 'draft',
    });
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.saveDraft = async (req, res) => {
  const { id, title, content, tags, location, date } = req.body;
  try {
    const post = await BlogPost.findByPk(id);
    if (post) {
      post.title = title;
      post.content = content;
      post.tags = tags;
      post.location = location;
      post.date = date;
      post.status = 'draft';
      await post.save();
      return res.status(200).json(post);
    }
    return res.status(404).json({ error: 'Post not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save draft' });
  }
};

exports.publishPost = async (req, res) => {
  const { id } = req.body;
  try {
    const post = await BlogPost.findByPk(id);
    if (post) {
      post.status = 'published';
      await post.save();
      return res.status(200).json(post);
    }
    return res.status(404).json({ error: 'Post not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to publish post' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      where: { status: 'published' },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

exports.getDrafts = async (req, res) => {
  try {
    const drafts = await BlogPost.findAll({
      where: { status: 'draft' },
    });
    return res.status(200).json(drafts);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve drafts' });
  }
};
