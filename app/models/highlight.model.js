
module.exports = (sequelize, Sequelize) => {
    const Highlight = sequelize.define("highlight", {
      highlightId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      chapterNum: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      startloc: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      startNode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      endloc: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      endNode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING
      },
      commonAncestorId: {
        type: Sequelize.STRING
      },
      timeSent: {
        type: Sequelize.DATE,
        allowNull:false
      },
      fromUser: {
        type: Sequelize.STRING,
        allowNull:false
      }
    });
    return Highlight;
  };