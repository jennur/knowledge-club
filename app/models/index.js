const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.articles = require("./article.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.videos = require("./video.model.js")(sequelize, Sequelize);

db.books.hasMany(db.videos, { as: "videos" });
db.books.hasMany(db.articles, { as: "articles" });

db.videos.belongsTo(db.books, {
  foreignKey: "bookId",
  as: "book",
});

db.articles.belongsTo(db.books, {
  foreignKey: "bookId",
  as: "book",
});

module.exports = db;