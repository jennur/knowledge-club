require('dotenv').config()

const ssl = process.env.NODE_ENV === "production" && { ssl: {
      require: true,
      rejectUnauthorized: false
    }} || {}
    
module.exports = {
  URL: process.env.DB_URL,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  pool: {...process.env.DB_POOL},
  dialectOptions: {...ssl},
  
};
