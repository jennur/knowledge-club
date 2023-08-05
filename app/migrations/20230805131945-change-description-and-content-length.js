'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'articles',
      'description',
      {
        type: Sequelize.STRING(1000),
      }
    );

    await queryInterface.changeColumn(
      'highlights',
      'content',
      {
        type: Sequelize.STRING(1000),
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'articles',
      'description',
      {
        type: Sequelize.STRING,
      }
    );

    await queryInterface.changeColumn(
      'highlights',
      'content',
      {
        type: Sequelize.STRING,
      }
    );
  }
};
