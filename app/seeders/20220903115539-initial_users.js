'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    //   const userRole = await roleController.create({ id: 1, name: "user" })
//   const moderatorRole = await roleController.create({ id: 2, name: "moderator" })
//   const adminRole = await roleController.create({ id: 3, name: "admin" })
//   const adminUser = await userController.create({
//     username: process.env.ADMIN_USERNAME,
//     password: process.env.ADMIN_PASSWORD,
//     email: process.env.ADMIN_EMAIL
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
