module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return User;
};