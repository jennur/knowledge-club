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
      console.log(">> Error while creating message: ", err);
      return err;
    });
};

// Retrieve all messages from the database.
exports.findAll = () => {
  return Chat.findAll().then((messages) => {
    return(messages)
  }).catch(err=>{
    console.log(err)
  });
};

// Find a single Chat with a room id
exports.findByRoomId = (roomId) => {
  return Chat.findAll({
      where: { roomId }
    })
    .then((messages) => {
      return messages
    })
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