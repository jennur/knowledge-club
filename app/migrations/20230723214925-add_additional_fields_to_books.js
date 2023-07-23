'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'metadata', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('books', 'languages', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('books', 'identifiers', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('books', 'numPages', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('books', 'coverImage', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('books', 'metadata');
    await queryInterface.removeColumn('books', 'languages');
    await queryInterface.removeColumn('books', 'identifiers');
    await queryInterface.removeColumn('books', 'numPages');
    await queryInterface.removeColumn('books', 'coverImage');
  }
};
