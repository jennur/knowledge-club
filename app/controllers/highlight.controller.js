const db = require("../models");
const Highlight = db.highlight;
const Op = db.Sequelize.Op;

// Create and Save a new Chat
exports.create = (highlight) => {
  return Highlight.create(highlight)
    .then((highlight) => {
      return highlight;
    })
    .catch((err) => {
      console.log(">> Error while creating book: ", err);
    });
};

// Retrieve all messages from the database.
exports.findAll = (bookId,ChapterId) => {
  return Highlight.findAll({
    where:{
        bookUUID:bookId,
        chapterUUID:ChapterId
    }
  }).then((messages) => {
    res.send(messages);
  });
};


// Update a Chat by the id in the request
exports.update = () => {
  
};

// Delete a Chat with the specified id in the request
exports.delete = () => {
};

// Delete all Chats from the database.
exports.deleteAll = () => {
  Highlight.destroy({
    where: {},
    truncate: true
  });
};

// Find all published Chats
exports.findAllPublished = () => {
};