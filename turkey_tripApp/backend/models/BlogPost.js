const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('turkey_tripApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

class BlogPost extends Model {
  static init(sequelize) {
    super.init({
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true
      },
      videos: {
        type: DataTypes.JSON,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'BlogPost',
      tableName: 'BlogPosts',
      timestamps: false
    });
  }
}

BlogPost.init(sequelize);

module.exports = BlogPost;
