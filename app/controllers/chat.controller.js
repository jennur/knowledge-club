const db = require("../models");
const Chat = db.chat;
const Op = db.Sequelize.Op;

// Create and Save a new Chat
exports.create = (message) => {
  return Chat.create(message)
    .then((message) => {
      console.log(">> Created Chat:", messageId);
      return message;
    })
    .catch((err) => {
      console.log(">> Error creating Chat:", err.message);
      return Promise.reject(err);
    });
};

// Retrieve all messages from the database.
exports.findAll = () => {
  return Chat.findAll()
  .then(response => response)
  .catch((err) => {
    console.log(">> Error finding all Chats:", err.message);
    return Promise.reject(err);
  });
};

// Find a single Chat with a room id
exports.findByRoomId = (roomId) => {
  return Chat.findAll({ where: { roomId }})
    .then(messages => messages)
    .catch((err) => {
      console.log(">> Error finding Chat by roomId:", err.message);
      return Promise.reject(err);
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
  Chat.destroy({ where: {}, truncate: true })
  .then(() => {
    console.log(">> Destroyed Chat");
  })
  .catch((err) => {
    console.log(">> Error destroying chat:", err.message);
    return Promise.reject(err);
  });
};

// Find all published Chats
exports.findAllPublished = () => {
};