'use strict';
var bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const adminUser = {
      userId: 0,
      username: process.env.ADMIN_USERNAME,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD,8),
      email: process.env.ADMIN_EMAIL,
    }

    const userRole = {
      userId: adminUser.userId,
      roleId: 3
    }

    await queryInterface.bulkInsert("users", [adminUser], {transaction});
    await queryInterface.bulkInsert("user_roles", [userRole], {transaction});
    transaction.commit();
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.bulkDelete("user_roles");
      await queryInterface.bulkDelete("users");
      
      await transaction.commit();
    }
    catch(err){
      await transaction.rollback();
      throw err;
    }
  }
};
