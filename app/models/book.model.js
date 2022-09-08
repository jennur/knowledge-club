
module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
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
      }
    });

    return Book;
  };