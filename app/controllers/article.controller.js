const db = require("../models");
const Article = db.articles;
const Op = db.Sequelize.Op;

// Create and Save a new Article
exports.create = (article) => {
  return Article.create(article)
    .then((article) => {
      console.log(">> Created Article:", article.articleId);
      return article;
    })
    .catch((err) => {
      console.log(">> Error creating Article:", err.message);
      return Promise.reject(err);
    });
};

// Retrieve all Articles from the database.
exports.findAll = () => {
  return Article.findAll()
    .then(articles => articles)
    .catch((err) => {
      console.log(">> Error finding all Articles:", err.message);
      return Promise.reject({ message: err.message });
    });
};

// Find a single Article with an id
exports.findById = (id) => {
  return Article.findByPk(id, { include: "highlight" })
    .then(article => article)
    .catch((err) => {
      console.log(">> Error while finding Article:", err.message);
      return Promise.reject(err);
    });
};

// Set highlight
exports.setHighlight = (articleId, highlightId) => {
  return Article.findByPk(articleId)
    .then((article) => {
      return db.highlights.findByPk(highlightId)
        .then((highlight) => {
          article.setHighlight(highlight);
          console.log(`>> Added Highlight id=${highlight.highlightId} to Article id=${article.articleId}`);
          return article;
        })
        .catch((err) => {
          console.log(">> Error finding Highlight:", err.message);
          return Promise.reject(err);
        });
    })
    .catch((err) => {
      console.log(">> Error finding Article:", err.message);
      return Promise.reject(err);
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