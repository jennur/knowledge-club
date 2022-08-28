module.exports = (sequelize, Sequelize) => {
    const Highlight = sequelize.define("highlight", {
      highlightuuid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
      },
      bookUUID:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      chapterUUID: {
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
      timesent:{
        type:Sequelize.DATE,
        allowNull:false
      },
      fromUser:{
        type:Sequelize.STRING,
        allowNull:false
      },
      content:{
        type:Sequelize.STRING
      }
    });
    return Highlight;
  };