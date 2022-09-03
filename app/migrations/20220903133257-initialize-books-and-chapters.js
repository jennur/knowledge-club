'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable("books",
      {
        bookUUID: {
          type:Sequelize.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
        },      
        title: {
          type: Sequelize.STRING,
          allowNull:false
        },
        published: {
          type: Sequelize.BOOLEAN,
          allowNull:false
        },
        fileType:{
          type:Sequelize.STRING,
          allowNull:false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull:false,
          default: DataTypes.NOW
      },
        numChapters:{
          type:Sequelize.INTEGER
        }
      });
      // await queryInterface.bulkInsert("books",fake_books,{transaction});
      await queryInterface.createTable("chapters",
      {
        chapterUUID:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        chapterName: {
            type: Sequelize.STRING,
        },
        bookUUID:{
          type:Sequelize.INTEGER
        },
        chapterNumber:{
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull:false,
            default: DataTypes.NOW
        },
        chapterContent:{
            type: Sequelize.TEXT,
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
      await queryInterface.dropTable("chapters")
      await queryInterface.dropTable("videos");
      await queryInterface.dropTable("articles");
      await queryInterface.dropTable("books");
      
      await transaction.commit()

    }catch(err){
      await transaction.rollback();
      throw err;
    }
    
  }
};
