const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.URL, {
  host: dbConfig.HOST,
  database: dbConfig.DB,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {...dbConfig.dialectOptions},
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  pool: {...dbConfig.pool}
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.articles = require("./article.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.videos = require("./video.model.js")(sequelize, Sequelize);
db.roles = require("../models/role.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.chapters = require("../models/chapter.model.js")(sequelize, Sequelize)
db.chat = require("../models/chat.model.js")(sequelize, Sequelize)
db.highlight = require("../models/highlight.model.js")(sequelize, Sequelize)
db.raw = require("../models/raw.model.js")(sequelize, Sequelize)

db.books.hasMany(db.videos, { as: "videos" });
db.books.hasMany(db.articles, { as: "articles" });
// db.books.hasMany(db.chapters, { as: "chapters" });

db.articles.belongsTo(db.books, {
  foreignKey: "bookUUID",
  as: "book",
});

db.videos.belongsTo(db.books, {
  foreignKey: "bookUUID",
  as: "book",
});

// db.chapters.belongsTo(db.books, {
//   foreignKey: {
//     name: "chapterUUID",
//     allowNull: false
//   }
// });

db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;