var bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "You must enter a username"
        },
        notNull: {
          msg: "You must enter a username"
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "The e-mail address you entered is not valid"
        },
        notEmpty: {
          args: true,
          msg: "You must enter an e-mail address"
        },
        notNull: {
          msg: "You must enter an e-mail address"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "You must enter a password"
        },
        notNull: {
          msg: "You must enter a password"
        }
      },
      set (value) {
        if(value && (value.length >= 8 && value.length <= 15)) {
          this.setDataValue("password", bcrypt.hashSync(value, 8));
        } else {
          throw {
            errors: [{ 
              path: "password",
              message: "Your password must be between 8 and 15 characters" 
            }]
          };
        }
      }
    },
    biography: {
      type: Sequelize.STRING
    },
    favoriteCategories: {
      type: Sequelize.STRING
    }
  });
  return User;
};