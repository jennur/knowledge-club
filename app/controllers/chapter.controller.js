const db = require("../models");
const Chapter = db.chapters;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (chapter) => {
  return Chapter.create(chapter)
    .then((chapter) => {
      console.log(">> Created chapter: " + chapter.chapterName);
      return chapter;
    })
    .catch((err) => {
      console.log(">> Error while creating book: ", err);
    });
};

// Retrieve all Books from the database.
exports.findAll = (bookId) => {
  return Chapter.findAll({
    where:{
      bookUUID:bookId,
      
  },
  order:[['chapterNumber','ASC']]
}).then((chapters) => {
    return chapters;
  });
};

// Find a single Book with an id
exports.findById = (chapterId) => {
  return Chapter.findByPk(chapterId)
    .then((chapter) => {
        return chapter;
    })
    .catch((err) => {
        console.log(">> Error while finding chapter: ", err);
    });
};

// Update a Book by the id in the request
exports.update = () => {
  
};

// Delete a Book with the specified id in the request
exports.delete = () => {
};

// Delete all Books from the database.
exports.deleteAll = () => {
  Chapter.destroy({where:{},
  truncate:true}).then((chapter)=>{
    console.log("destroyed book" + chapter.chaptrName)
  })
};

// Find all published Books
exports.findAllPublished = () => {
  
};