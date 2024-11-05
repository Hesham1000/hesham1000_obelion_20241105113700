module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('blog_posts', [
      {
        title: '',
        content: '',
        tags: '',
        location: '',
        date: null,
        status: 'draft'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('blog_posts', null, {})
};
