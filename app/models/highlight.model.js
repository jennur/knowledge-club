const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Highlight = sequelize.define("highlight", {
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
      }
    });
    return Highlight;
  };