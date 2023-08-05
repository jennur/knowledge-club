
module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      bookUUID: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },     
      category: {
        type: Sequelize.STRING,
      }, 
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      published: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      fileType: {
        type:Sequelize.STRING,
        allowNull:false
      },
      numChapters: {
        type:Sequelize.INTEGER
      },
      metadata: {
        type: Sequelize.STRING
      },
      languages: {
        type: Sequelize.STRING
      },
      identifiers: {
        type: Sequelize.STRING
      },
      numPages: {
        type: Sequelize.INTEGER
      },
      coverImage: {
        type: Sequelize.STRING
      }
    });

    return Book;
  };