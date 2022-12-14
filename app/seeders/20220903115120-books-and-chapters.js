'use strict';
const { query } = require("express");
const faker = require("faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      var fake_books = [...Array(1)].map((book,index) => {
        return (
        {
          bookUUID: index,
          title:faker.commerce.productName(),
          published: true,
          fileType:".epub",
          numChapters:faker.mersenne.rand(20,5)
        })
      });
      var chapters = Array();
      for(let book of fake_books){
        for(let chapter_num of Array(book.numChapters).keys()){
          chapters.push({
            chapterName: faker.name.firstName(),
            chapterNumber: chapter_num,
            bookUUID:book.bookUUID,
            chapterContent: faker.lorem.paragraphs(5)
          })
        }
      }
      await queryInterface.bulkInsert("books",fake_books,{transaction});
      await queryInterface.bulkInsert("chapters",chapters,{transaction});
      transaction.commit();
   
    }catch(err){
      await transaction.rollback();
      throw err;
    }
    
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.bulkDelete("chapters");
      await queryInterface.bulkDelete("books");
      
      await transaction.commit();
    }
    catch(err){
      await transaction.rollback();
      throw err;
    }
    
  }
};
