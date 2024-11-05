module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('blog_posts', []),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('blog_posts', null, {})
};
