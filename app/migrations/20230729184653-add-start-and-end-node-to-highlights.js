'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('highlights', 'startNode', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('highlights', 'endNode', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('highlights', 'startNode');
    await queryInterface.removeColumn('highlights', 'endNode');
  }
};