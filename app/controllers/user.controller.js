const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (user) => {
  return User.create(user)
  .then((user) => {
      console.log(">> Created User:", user.userId);
      return user;
  })
  .catch((err) => {
      console.log(">> Error while creating user:", err);
      return Promise.reject(err);
  });
};

// Get a User by the id in the request
exports.findById = (userId) => {
  return User.findOne({
    where: { userId },
    include: [{
      model: db.roles,
      as: "roles"
    }]
  })
  .then((user) => {
    return {
      id: user.userId,
      username: user.username,
      email: user.email,
      biography: user.biography,
      favoriteCategories: user.favoriteCategories,
      roles: user.roles
    };
  })
  .catch((err) => {
    console.log(">> Error finding user:", err.message);
    return Promise.reject(err);
  });
};

// Update a user's username
exports.updateUsername = async (username, userId) => {
  const user = await User.findOne({ where: { userId }});
  user.username = username;
  return user.save()
    .then(user => user.username)
    .catch((err) => {
      console.log(">> Error saving new username:", err.message);
      return Promise.reject({ message: err.message });
    });
};

// Update a user's email
exports.updateEmail = async (email, userId) => {
  const user = await User.findOne({ where: { userId }});
  user.email = email;
  return user.save()
    .then(user => user.email)
    .catch((err) => {
      console.log(">> Error saving new email:", err.message);
      return Promise.reject({ message: err.message });
    });
};

// Update a user's biography
exports.updateBiography = async (biography, userId) => {
  const user = await User.findOne({ where: { userId }});
  user.biography = biography;
  return user.save()
    .then(user => user.biography)
    .catch((err) => {
      console.log(">> Error saving new biography:", err.message);
      return Promise.reject({ message: err.message });
    });
};

// Update a user's favorite categories
exports.updateFavoriteCategories = async (favoriteCategories, userId) => {
  const user = await User.findOne({ where: { userId }});
  user.favoriteCategories = favoriteCategories;
  return user.save()
    .then(user => user.favoriteCategories)
    .catch((err) => {
      console.log(">> Error saving new favorite categories:", err.message);
      return Promise.reject({ message: err.message });
    });
};

// Delete a User with the specified id in the request
exports.delete = (id) => {};

// Set user role
exports.setRole = (userId, roleId) => {
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log(">> Error setting role: User not found!");
        return Promise.reject({ message: "User not found"})
      }
      return db.roles.findByPk(roleId)
        .then(async (role) => {
          if (!role) {
            console.log(">> Error setting role: Role not found!");
            return Promise.reject({ message: "Role not found"})
          }

          try {
            await user.setRoles(role);
            console.log(`>> added Role id=${role.roleId} to User id=${user.userId}`);
          }
          catch(err) {
            console.log(">> Error setting Roles:", err.message);
            return Promise.reject({ message: err.message });
          }

          return user;
        })
        .catch((err) => {
          return Promise.reject({ message: err.message });
        });
    })
    .catch((err) => {
      console.log(">> Error adding Role to User:", err.message);
      return Promise.reject({ message: err.message });
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