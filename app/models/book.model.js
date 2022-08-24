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
      dateUploaded: {
        type: Sequelize.DATE,
        allowNull:false
      },
      published: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      FileType:{
        type:Sequelize.STRING,
        allowNull:false
      },
      NumChapters:{
        type:Sequelize.INTEGER
      }
    });

    return Book;
  };