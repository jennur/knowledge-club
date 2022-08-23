import { io } from "socket.io-client";

var socket = io("http://localhost:8080");

socket.on("connected", () => {
  console.log("Connected");
})

socket.on("message",(msg)=>{
  var all_messages = document.getElementById("all_messages");
  console.log(msg);

  let new_child = document.createElement("li");
  new_child.textContent= msg;
  all_messages.appendChild(new_child);
})

function sendMessage(message){
  socket.emit("message",message);
};

export {
    socket,
    sendMessage
}
