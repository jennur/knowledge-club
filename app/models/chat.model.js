module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
      messageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
      },
      roomId: {
        type: Sequelize.STRING,
        allowNull:false
      },
      message:{
        type:Sequelize.TEXT,
        allowNull:false
      },
      timesent:{
        type:Sequelize.DATE,
        allowNull:false
      },
      fromUser:{
        type:Sequelize.STRING,
        allowNull:false
      }
    });
    return Chat;
  };