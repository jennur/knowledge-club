const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({ errors: [{
          field: "username",
          message: "Username is already in use"
        }]
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({ errors: [{
            field: "email",
            message: "E-mail is already in use"
          }]
        });
        return;
      }
      next();
    })
    .catch(err => {
      console.log("Error finding user by email:", err);
      res.status(500).send({
        message: err.message
      });
    });
  })
  .catch(err => {
    console.log("Error finding user by username:", err);
    res.status(500).send({
      message: err.message
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
          message: `Role does not exist: ${req.body.roles[i]}`
          });
          return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;
