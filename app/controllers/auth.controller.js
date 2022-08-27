const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const accessTokenCookie = "kc_access_token";
const defaultError = {
  message: "Something went wrong, please contact us if the issue persists."
}

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was registered successfully" });
        });
      });
    } else {
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully" });
      });
    }
  })
  .catch(err => {
    var errors = err?.errors?.map(error => {
      return {
        message: error.message,
        field: error.path
      }
    });
    res.status(500).send({ errors });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "Invalid password or username" });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password or username"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    var authorities = [];

    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res
        .cookie(accessTokenCookie, token, { httpOnly: true })
        .status(200)
        .send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
    });
  })
  .catch(err => {
    const errors = err?.errors?.map(error => {
      return {
        message: error.message,
        field: error.path
      }
    });
    res.status(500).send({ errors });
  });
};

exports.logout = (req, res) => {
  res.clearCookie(accessTokenCookie);
  res.send({ message: "User logged out" })
};