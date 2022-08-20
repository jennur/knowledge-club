require('dotenv').config({ path: __dirname + "/./../../.env"})

module.exports = {
    secret: process.env.AUTH_SECRET_KEY
  };