'use strict';


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
        numChapters:{
          type:Sequelize.INTEGER
        },
        createdAt: {
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
        updatedAt:{
          type: Sequelize.DATE,
          default: Sequelize.NOW
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
        chapterNumber:{
            type: Sequelize.STRING
        },
        chapterContent:{
            type: Sequelize.TEXT,
        },
        createdAt: {
            type: Sequelize.DATE,
            default: Sequelize.NOW
        },
        updatedAt:{
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
        bookUUID: {
          type: Sequelize.INTEGER,
          references: { model: 'books', key: 'bookUUID' },
          onDelete: 'CASCADE',
        },
      });
      transaction.commit();
   
    }
    catch(err) {
      await transaction.rollback()
      throw err;
    }
    
  },
  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.dropTable("chapters");
      await queryInterface.dropTable("books");
      
      await transaction.commit()

    }catch(err){
      await transaction.rollback();
      throw err;
    }
    
  }
};
