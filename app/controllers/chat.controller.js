const db = require("../models");
const Chat = db.chat;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (message) => {
  return Chat.create(message)
    .then((message) => {
      console.log(">> Message added from: " + message.fromuser);
      return message;
    })
    .catch((err) => {
      console.log(">> Error while creating book: ", err);
    });
};

// Retrieve all Books from the database.
exports.findAll = (req,res) => {
  return Chat.findAll().then((messages) => {
    res.send(messages);
  });
};

// Find a single Book with an id
exports.findByRoomId = (RoomId) => {
  return Chat.findAll({where:{roomid:RoomId}})
    .then((messages) => {
        return messages;
    })
    .catch((err) => {
        console.log(">> Error while finding messages: ", err);
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
  Chat.destroy({where:{},truncate:true});
};

// Find all published Books
exports.findAllPublished = () => {
  
};