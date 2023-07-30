const db = require("../models");
const Chapter = db.chapters;
const Op = db.Sequelize.Op;

// Create and Save a new Chapter
exports.create = (chapter) => {
  return Chapter.create(chapter)
    .then((chapter) => {
      console.log(">> Created chapter: " + chapter.chapterName);
      return chapter;
    })
    .catch((err) => {
      console.log(">> Error while creating chapter: ", err);
    });
};

// Retrieve all Chapters from the database.
exports.findAll = (bookId) => {
  return Chapter.findAll({
    where:{
      bookUUID: bookId,
    },
    order:[['chapterNumber','ASC']]
  })
  .then(chapters => {
    console.log(">> Found chapters of bookId: " + bookId);
    return chapters;
  })
  .catch(err => {
    console.log(">> Error while finding all chapters: ", err.message);
  });
};

exports.findOne = (bookId,chapterNum) => {
  console.log(bookId, chapterNum)
  return Chapter.findAll({
    where: {
      bookUUID:bookId,
      chapterNumber:chapterNum
    }
  }).then((chapters) => {
    return chapters[0];
  });
};

// Find a single Book with an id
exports.findById = (chapterId) => {
  return Chapter.findByPk(chapterId)
    .then((chapter) => {
        return chapter;
    })
    .catch((err) => {
        console.log(">> Error while finding chapter: ", err.message);
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
  Chapter.destroy({where:{},
  truncate:true}).then((chapter)=>{
    console.log("destroyed book" + chapter.chaptrName)
  })
};

// Find all published Chapters
exports.findAllPublished = () => {
  
};