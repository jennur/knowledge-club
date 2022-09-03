require('dotenv').config({ path: __dirname + "/./../../.env"})

const ssl = process.env.NODE_ENV === "production" && { ssl: {
      require: true,
      rejectUnauthorized: false
    }} || {}
    
module.exports = {
  URL: process.env.DB_URL,
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "postgres",
  pool: {...process.env.DB_POOL},
  dialectOptions: {...ssl},
};
