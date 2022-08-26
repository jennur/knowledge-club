module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
      messageid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
      },
      roomid: {
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
      fromuser:{
        type:Sequelize.STRING,
        allowNull:false
      }
    });
    return Chat;
  };