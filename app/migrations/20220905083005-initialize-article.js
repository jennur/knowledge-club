'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.createTable("articles",{
        articleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
        },
        type: {
          type: Sequelize.STRING
        },
        title: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        published: {
          type: Sequelize.BOOLEAN
        },
        highlightId: {
          type: Sequelize.INTEGER,
          references: { model: 'highlights', key: 'highlightId' },
          onDelete: 'CASCADE',
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
      await queryInterface.dropTable("articles")
      await transaction.commit()
    }catch(err){
      await transaction.rollback();
      throw err;
    }
    
  }
};

