const db = require("../models");
const Chapter = db.chapters;
const Op = db.Sequelize.Op;

// Create and Save a new Chapter
exports.create = (chapter) => {
  return Chapter.create(chapter)
    .then((chapter) => {
      console.log(">> Created Chapter:", chapter.chapterUUID);
      return chapter;
    })
    .catch((err) => {
      console.log(">> Error creating Chapter:", err.message);
      return Promise.reject(err);
    });
};

// Retrieve all Chapters from the database.
exports.findAll = (bookId) => {
  return Chapter.findAll({
    where: {
      bookUUID: bookId,
    },
    order:[['chapterNumber','ASC']]
  })
  .then(chapters => chapters)
  .catch(err => {
    console.log(">> Error finding all Chapters:", err.message);
    return Promise.reject(err);
  });
};

exports.findOne = (bookId, chapterNum) => {
  console.log(bookId, chapterNum)
  return Chapter.findAll({
    where: {
      bookUUID: bookId,
      chapterNumber: chapterNum
    }
  })
  .then(chapters => chapters[0])
  .catch((err) => {
    console.log(">> Error finding all Chapters from bookId and chapterNum:", err.message);
    return Promise.reject(err);
  });
};

// Find a single Book with an id
exports.findById = (chapterId) => {
  return Chapter.findByPk(chapterId)
    .then(chapter => chapter)
    .catch((err) => {
      console.log(">> Error finding Chapter by id:", err.message);
      return Promise.reject(err);
    });
};

// Update a Chapter by the id in the request
exports.update = () => {
  
};

// Delete a Chapter with the specified id in the request
exports.delete = () => {
};

// Delete all Chapters from the database.
exports.deleteAll = () => {
  Chapter.destroy({
    where: {},
    truncate:true
  })
  .then((chapter) => {
    console.log(">> Destroyed chapter:", chapter.chapterName)
  })
  .catch((err) => {
    console.log(">> Error destroying Chapter", err.message);
    return Promise.reject(err);
  })
};

// Find all published Chapters
exports.findAllPublished = () => {
  
};