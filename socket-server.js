const chatController = require("./app/controllers/chat.controller.js")

module.exports = function(io) {
  
  io.on('connection', async (socket) => {
    console.log('a user connected');
    socket.emit("connected");


    const sendUsersOnline = (roomId) => {
      const numUsers = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      io.to(roomId).emit('usersOnline', numUsers);
    };

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
      sendUsersOnline(roomId)
    });

    socket.on("message", (msg) => {
      msg.fromUser = JSON.stringify(msg.fromUser);

      chatController.create(msg)
        .then((msg) => {
          msg.fromUser = JSON.parse(msg.fromUser)
          io.to(msg.roomId).emit('message', msg);
        })
        .catch((err) => {
          console.error(err.message);
        })
    });

    socket.on("privateMessage", (toSocketId, msg) => {
      socket.to(toSocketId).emit("privateMessage", socket.id, msg);
    });

    // socket.on('disconnecting', () => {
    //   const rooms = Array.from(socket.rooms);
    //   console.log("\n\n\nROOMS:", socket.rooms);

    //   rooms.forEach((room) => {
    //     console.log("\n\n\nROOM:", room);
    //     sendUsersOnline(room);
    //   });
    // });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      const rooms = Array.from(socket.rooms);
      console.log("\n\n\nROOMS:", socket.rooms);

      rooms.forEach((room) => {
        console.log("\n\n\nROOM:", room);
        sendUsersOnline(room);
      });
    });
  });
}