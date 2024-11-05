const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('turkey_tripApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tags: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['draft', 'published'],
      defaultValue: 'draft',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BlogPost',
    timestamps: false,
    tableName: 'blog_posts',
  }
);

module.exports = BlogPost;