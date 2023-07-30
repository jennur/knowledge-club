const db = require("../models");
const Highlight = db.highlights;
const Op = db.Sequelize.Op;

// Create and Save a new Highlight
exports.create = (highlight) => {
  return Highlight.create(highlight)
    .then((highlight) => {
      console.log(">> Created Highlight:", highlight.highlightId);
      return highlight;
    })
    .catch((err) => {
      console.log(">> Error creating Highlight:", err.message);
      return Promise.reject(err);
    });
};

// Retrieve all messages from the database.
exports.findAll = (bookId, ChapterNum) => {
  return Highlight.findAll({
    where:{
        bookId: bookId,
        chapterNum: ChapterNum
    },
    include: [{
      model: db.articles,
      as: "articles"
    }]
  }).then(highlights => highlights)
  .catch((err) => {
    console.log(">> Error finding all Highlights:", err.message);
    return Promise.reject(err);
  });
};


// Update a Highlight by the id in the request
exports.update = () => {
  
};

// Delete a Highlight with the specified id in the request
exports.delete = () => {
};

// Delete all Highlights from the database.
exports.deleteAll = () => {
  Highlight.destroy({
    where: {},
    truncate: true
  })
  .then(() => {
    console.log(">> Destroyed all Highlights");
  })
  .catch((err) => {
    console.log(">> Error destroying all Highlights:", err.message);
    return Promise.reject(err);
  })
  ;
};

// Find all published Highlights
exports.findAllPublished = () => {};