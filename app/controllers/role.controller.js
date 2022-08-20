const db = require("../models");
const Role = db.roles;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (role) => {
  return Role.create({
      id: role.id,
      name: role.name,
    })
    .then((role) => {
        console.log(">> Created role: " + JSON.stringify(role, null, 4));
        return role;
    })
    .catch((err) => {
        console.log(">> Error while creating role: ", err);
    });
};

// Find a single Role by id
exports.findById = (id) => {
    return Role.findOne({
        where: {
            id
        }
    }).then((role) => {
        console.log(">> Found role: " + JSON.stringify(role, null, 4));
        return role;
    })
    .catch((err) => {
        console.log(">> Error finding role: ", err);
    });
};