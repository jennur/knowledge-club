require('dotenv').config({ path: __dirname + "/./../../.env"})

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  pool: {...process.env.DB_POOL},
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
};
