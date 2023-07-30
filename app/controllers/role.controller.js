const db = require("../models");
const Role = db.roles;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (role) => {
  return Role.create(role)
    .then((role) => {
      console.log(">> Created Role:", role.roleId);
      return role;
    })
    .catch((err) => {
      console.log(">> Error creating Role:", err.message);
      return Promise.reject(err);
    });
};

// Find a single Role by id
exports.findById = (id) => {
  return Role.findOne({
    where: { id }
  })
  .then(role => role)
  .catch((err) => {
    console.log(">> Error finding Role by id:", err.message);
    return Promise.reject(err);
  });
};