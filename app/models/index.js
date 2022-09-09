require('dotenv').config({ path: __dirname + "/./../.env"});

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const config = dbConfig[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(config.url, config);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.articles = require("./article.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.roles = require("../models/role.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.chapters = require("../models/chapter.model.js")(sequelize, Sequelize)
db.chat = require("../models/chat.model.js")(sequelize, Sequelize)
db.highlights = require("../models/highlight.model.js")(sequelize, Sequelize)
db.raw = require("../models/raw.model.js")(sequelize, Sequelize)

db.highlights.hasMany(db.articles, {
  foreignKey: "highlightId"
});

db.articles.belongsTo(db.highlights, {
  foreignKey: "highlightId"
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