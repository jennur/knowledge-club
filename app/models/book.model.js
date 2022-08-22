module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      title: {
        type: Sequelize.STRING
      },
      dateUploaded: {
        type: Sequelize.DATE
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });

    return Book;
  };