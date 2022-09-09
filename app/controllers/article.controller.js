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
  return Article.findByPk(id, { include: "highlight" })
    .then(article => article)
    .catch((err) => {
        console.log(">> Error while finding article: ", err);
    });
};

// Set highlight
exports.setHighlight = (articleId, highlightId) => {
  return Article.findByPk(articleId)
    .then((article) => {
      if (!article) {
        console.log("Error setting highlight: Article not found!");
        return null;
      }
      return db.highlights.findByPk(highlightId).then((highlight) => {
        if (!highlight) {
          console.log("Error setting highlight: Highlight not found!");
          return null;
        }
        article.setHighlight(highlight);
        console.log(`>> added Highlight id=${highlight.highlightId} to Article id=${article.articleId}`);
        return article;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Highlight to Article: ", err);
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