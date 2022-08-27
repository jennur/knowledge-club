const db = require("../models");
const Chat = db.chat;
const Op = db.Sequelize.Op;

// Create and Save a new Chat
exports.create = (message) => {
  return Chat.create(message)
    .then((message) => {
      console.log(">> Message added from: " + message.fromUser);
      return message;
    })
    .catch((err) => {
      console.log(">> Error while creating book: ", err);
    });
};

// Retrieve all messages from the database.
exports.findAll = (req,res) => {
  return Chat.findAll().then((messages) => {
    res.send(messages);
  });
};

// Find a single Chat with a room id
exports.findByRoomId = (RoomId) => {
  return Chat.findAll({
      where: {
        roomid:RoomId
      }
    })
    .then((messages) => messages)
    .catch((err) => {
        console.log(">> Error while finding messages: ", err);
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
  Chat.destroy({
    where: {},
    truncate: true
  });
};

// Find all published Chats
exports.findAllPublished = () => {
};