const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (user) => {
  return User.create({
    username: user.username,
    password: user.password,
    email: user.email
  })
  .then((user) => {
      console.log(">> Created user: " + JSON.stringify(user, null, 4));
      return user;
  })
  .catch((err) => {
      console.log(">> Error while creating user: ", err);
      res.send({ message: err.message});
  });
};

// Get a User by the id in the request
exports.findById = (id) => {
  return User.findOne({
    where: {
      id
    }
  })
  .then((user) => {
    console.log(">> Found user: " + JSON.stringify(user, null, 4));
    return user;
  })
  .catch((err) => {
      console.log(">> Error finding user: ", err);
  });
};

// Update a User by the id in the request
exports.update = (id) => {
  
};

// Delete a User with the specified id in the request
exports.delete = (id) => {
  
};

// Tests
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};