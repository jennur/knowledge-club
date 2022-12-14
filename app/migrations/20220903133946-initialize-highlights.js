'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable("highlights",
      {
        highlightId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
        },
        bookId:{
          type:Sequelize.INTEGER,
          allowNull:false
        },
        chapterNum: {
          type: Sequelize.INTEGER,
          allowNull:false
        },
        startloc:{
          type:Sequelize.INTEGER,
          allowNull:false
        },
        endloc:{
          type:Sequelize.INTEGER,
          allowNull:false
        },
        content:{
          type:Sequelize.STRING
        },
        timeSent:{
          type:Sequelize.DATE,
          allowNull:false
        },
        fromUser:{
          type:Sequelize.STRING,
          allowNull:false
        },
        createdAt: {
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
        updatedAt:{
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
        chapterUUID: {
          type: Sequelize.INTEGER,
          references: { model: 'chapters', key: 'chapterUUID' },
          onDelete: 'CASCADE',
        },
      },
      );
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
      await queryInterface.dropTable("highlights")
      await transaction.commit()
    }catch(err){
      await transaction.rollback();
      throw err;
    }
    
  }
};

