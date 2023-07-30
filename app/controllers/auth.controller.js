const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const defaultError = { 
  message: "Something went wrong, please contact us if the issue persists."
};

exports.signup = (username, email, password, roles) => {
  return User.create({ username, email, password })
    .then(user => {
      if (roles) {
        Role.findAll({ where: { name: { [Op.or]: roles }}})
          .then(roles => {
            user.setRoles(roles)
              .then(roles => roles)
              .catch((err) => {
                console.log(">> Error setting Roles:", err.message);
                return Promise.reject({ message: err.message });
              });
          });
      }
      else {
        user.setRoles([1])
          .then(roles => roles)
          .catch((err) => {
            console.log(">> Error setting Roles:", err.message);
            return Promise.reject({ message: err.message });
          });
      }
    })
    .catch((err) => {
      const errors = err?.errors?.map(error => {
        console.log(">> Error in field:", error.path);
        return {
          message: error.message,
          field: error.path
        }
      });
      console.log(">> Error registering user:", err.message);
      const error = errors && { errors } || defaultError;
      return Promise.reject(error)
    });
};

exports.signin = (username, password) => {
  return User.findOne({
    where: { username }
  })
  .then((user) => {
    if(!user) return Promise.reject({ message: "User not found"})

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return Promise.reject({ message: "Invalid password or username"})
    }

    const token = jwt.sign({ id: user.userId }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    var authorities = [];

    return user.getRoles()
      .then(roles => {
        roles.forEach((role) => {
          authorities.push("ROLE_" + role.name.toUpperCase());
        })
        const accessTokenCookie = config.accessTokenCookie;
        return { accessTokenCookie, token, user, authorities };
      })
      .catch(err =>{
        console.log(">> Error getting Roles:", err.message);
        return Promise.reject({ message: err.message });
      })
  })
  .catch((err) => {
    console.log(">> Error finding User by id:", err.message);
    return Promise.reject({ message: err.message });
  });
};