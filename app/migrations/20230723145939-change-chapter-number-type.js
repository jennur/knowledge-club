'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change chapterNumber type from STRING to INTEGER
    await queryInterface.changeColumn('chapters', 'chapterNumber', {
      type: 'INTEGER USING CAST("chapterNumber" as INTEGER)'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes if needed
    await queryInterface.changeColumn('chapters', 'chapterNumber', {
      type: 'STRING USING CAST("column" as STRING)'
    });
  },
};
