const BlogPost = require('../models/BlogPost');

exports.getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.createBlogPost = async (req, res) => {
  try {
    const { text, images, videos } = req.body;
    const newPost = await BlogPost.create({ text, images, videos });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const { text, images, videos } = req.body;
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    await post.update({ text, images, videos });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error: error.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    await post.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
