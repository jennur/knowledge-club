const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

// Create and Save a new Article
exports.create = (article) => {
  return Article.create(article)
    .then((article) => {
        console.log(">> Created article: " + JSON.stringify(article, null, 4));
        return article;
    })
    .catch((err) => {
        console.log(">> Error while creating article: ", err);
    });
};

// Retrieve all Articles from the database.
exports.findAll = () => {
  return Article.findAll().then(articles => articles);
};

// Find a single Article with an id
exports.findById = (id) => {
  return Article.findByPk(id, { include: "book" })
    .then(article => article)
    .catch((err) => {
        console.log(">> Error while finding article: ", err);
    });
};

// Update an Article by the id in the request
exports.update = () => {
  
};

// Delete an Article with the specified id in the request
exports.delete = () => {
  
};

// Delete all Articles from the database.
exports.deleteAll = () => {
  
};

// Find all published Articles
exports.findAllPublished = () => {
  
};