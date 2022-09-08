'use strict';
var bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable("users",
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
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
            if(value.length >= 8 && value.length <= 15) {
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
        createdAt: {
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
        updatedAt:{
          type: Sequelize.DATE,
          default: Sequelize.NOW
        }
      }
    );

    await queryInterface.createTable("roles",
      {
        roleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
        },
        name: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
        updatedAt:{
          type: Sequelize.DATE,
          default: Sequelize.NOW
        }
      }
    );

    await queryInterface.createTable("user_roles",
      {
        userId: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'userId' },
          onDelete: 'CASCADE',
        },
        roleId: {
          type: Sequelize.INTEGER,
          references: { model: 'roles', key: 'roleId' },
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: Sequelize.DATE,
          default: Sequelize.NOW
        },
        updatedAt:{
          type: Sequelize.DATE,
          default: Sequelize.NOW
        }
      }
    );

    transaction.commit();
    }
    catch(err) {
      transaction.rollback();
      console.log(err);
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("user_roles");
      await queryInterface.dropTable("users");
      await queryInterface.dropTable("roles");
      await transaction.commit();
    }
    catch(err) {
      await transaction.rollback();
      throw err;
    }
  }
};
