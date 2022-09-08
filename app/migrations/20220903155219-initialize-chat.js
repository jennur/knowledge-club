'use strict';
const { DataTypes } = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable("chats",
      {
        messageid: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
        },
        roomid: {
          type: Sequelize.STRING,
          allowNull:false
        },
        message:{
          type:Sequelize.TEXT,
          allowNull:false
        },
        timesent:{
          type:Sequelize.DATE,
          allowNull:false
        },
        fromUser:{
          type:Sequelize.STRING,
          allowNull:false
        },
        createdAt: {
          type: Sequelize.DATE,
          default: DataTypes.NOW
        },
        updatedAt:{
          type: Sequelize.DATE,
          default: DataTypes.NOW
        }
      });
      transaction.commit();
    }catch(err){
      await transaction.rollback()
      throw err;
    }
    
  },
  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.dropTable("chats")
      await transaction.commit()
    }catch(err){
      await transaction.rollback();
      throw err;
    }
    
  }
};

