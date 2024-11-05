const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('turkey_tripApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class BlogPost extends Model {}

BlogPost.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Title is required' },
      notEmpty: { msg: 'Title should not be empty' }
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Content is required' },
      notEmpty: { msg: 'Content should not be empty' }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: 'Must be a valid URL' }
    }
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: { msg: 'Must be a valid URL' }
    }
  }
}, {
  sequelize,
  modelName: 'BlogPost',
  tableName: 'blog_posts',
  timestamps: false
});

module.exports = BlogPost;