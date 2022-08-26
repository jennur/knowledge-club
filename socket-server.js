
const chatController = require("./app/controllers/chat.controller.js")

module.exports = function(io) {

  var connectedCount = 0;
  var connectedIps = {};

  io.on('connection', async (socket) => {
    console.log('a user connected');
    socket.emit("connected");

    const ip = socket.handshake.address;

    if(!connectedIps.hasOwnProperty(ip)) {
      connectedIps[ip] = 1;
      connectedCount++;
      socket.emit("usersOnline", connectedCount);
    }


    socket.on("message", (msg) => {
      io.emit("message", msg);
      chatController.create(msg)
    });

    socket.on("private message", (toSocketId, msg) => {
      socket.to(toSocketId).emit("private message", socket.id, msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      if(connectedIps.hasOwnProperty(ip)){
        delete connectedIps[ip];
        connectedCount--;
        socket.emit("usersOnline", connectedCount);
      }
    });
  });
}