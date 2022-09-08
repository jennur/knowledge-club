module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    roleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    name: {
      type: Sequelize.STRING
    }
  });
  return Role;
};