const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (user) => {
  return User.create(user)
  .then((user) => {
      console.log(">> Created user: " + JSON.stringify(user, null, 4));
      return user;
  })
  .catch((err) => {
      console.log(">> Error while creating user: ", err);
      return err;
  });
};

// Get a User by the id in the request
exports.findById = (userId) => {
  return User.findOne({
    where: {
      id: userId
    },
    include: [{
      model: db.roles,
      as: "roles"
    }]
  })
  .then((user) => {
    console.log(">> Found user: " + JSON.stringify(user, null, 4));

    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  })
  .catch((err) => {
      console.log(">> Error finding user: ", err);
      return err;
  });
};

// Update a user's username
exports.updateUsername = (req, res) => {
  const newUsername = req.body.newUsername;
  const user = User.findOne({
    where: {
      id: req.userId
    }
  });
  user.username = newUsername;
  user.save()
    .then(() => {
      return res.status(200).send({message: "Your username was successfully updated!"});
    })
    .catch((err) => {
      return res.status(500).send({message: err.message});
    });
};

// Update a User by the id in the request
exports.updateBiography = (req, res) => {
  const newBiography = req.body.newBiography;
  const user = User.findOne({
    where: {
      id: req.userId
    }
  });
  user.biography = newBiography;
  user.save()
    .then(() => {
      return res.status(200).send({message: "Your biography was successfully updated!"});
    })
    .catch((err) => {
      return res.status(500).send({message: err.message});
    });
};

// Delete a User with the specified id in the request
exports.delete = (id) => {
  
};


exports.setRole = (userId, roleId) => {
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log("Error setting role: User not found!");
        return null;
      }
      return db.roles.findByPk(roleId).then((role) => {
        if (!role) {
          console.log("Error setting role: Role not found!");
          return null;
        }
        user.setRoles(role);
        console.log(`>> added Role id=${role.id} to User id=${user.id}`);
        return user;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Role to User: ", err);
    });
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