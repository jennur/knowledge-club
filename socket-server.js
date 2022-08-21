const express = require('express');
const app = express();
const cors = require("cors");

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require("socket.io")(server,{
    cors:{
        origin:"http://localhost:5173"
    }
});

var corsOptions = {
    origin: "http://localhost:5173"
  };

app.use(cors(corsOptions));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("connected");

    socket.on("hei", (msg) => {
        io.emit("hei",msg);
      });
  });

server.listen(3000,()=>{console.log("listening on 3000")});