
module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("connected");

    socket.on("message", (msg) => {
        io.emit("message",msg);
      });
  });
}