import {io} from "socket.io-client";
var socket = io("http://localhost:3000");
function klah(){
    console.log("klah");
}
var all_messages = document.getElementById("all_messages");
socket.on("connected", () => {
    console.log("Connected");
} )

socket.on("hei",(msg)=>{
    var all_messages = document.getElementById("all_messages");
    console.log(msg);
    let new_child = document.createElement("li");
    new_child.textContent= msg;
    all_messages.appendChild(new_child);
})

export {
    klah as klee,
    socket as socket
}

export default function blah(){
    var input = document.getElementById("message");
    
    socket.emit("hei",input.value);
};
