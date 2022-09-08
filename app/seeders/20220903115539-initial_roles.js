'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const roles = [
      { roleId: 1, name: "user" },
      { roleId: 2, name: "moderator" },
      { roleId: 3, name: "admin" }
    ]
    await queryInterface.bulkInsert("roles", roles, {transaction});
    transaction.commit();
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.bulkDelete("roles");
      
      await transaction.commit();

    }
    catch(err){
      await transaction.rollback();
      throw err;
    }
  }
};