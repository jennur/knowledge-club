import { io } from "socket.io-client";

var socket = io("http://localhost:3000");

socket.on("connected", () => {
  console.log("Connected");
})

socket.on("hei",(msg)=>{
  var all_messages = document.getElementById("all_messages");
  console.log(msg);

  let new_child = document.createElement("li");
  new_child.textContent= msg;
  all_messages.appendChild(new_child);
})

function sendMessage(message){
  socket.emit("hei",message);
};

export {
    socket,
    sendMessage
}
