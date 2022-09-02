<script setup>
  import { io } from "socket.io-client";
  import { ref } from "vue"
    // import faker from "faker"
  import CommentBox from "../../components/CommentBox/CommentBox.vue"
  import IconButton from "../../components/Buttons/IconButton.vue"
  import Message from "./Message.vue"
  import store from "../../store/index"

  const props = defineProps({
    isRoom: Boolean,
    roomId: String
  })
  const messages = ref([]);
  store.dispatch("chat/getChatRoomMessages", props.roomId);

  const usersOnline = ref(0);
  const chatMessages = ref(null);

  var socket = io(import.meta.env.VITE_BASE_URL);

  socket.on("connected", () => {
    console.log("User connected");
  })
  socket.on("message", (msg) => {
    store.dispatch("chat/addMessageToState",msg);
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
  })

  socket.on("usersOnline", (number) => {
    console.log("Sockets:", number);
    usersOnline.value = number;
  })

  function sendMessage(msg){
    let message_out = {
      roomid: props.roomId,
      message: msg,
      timesent: Date(),
      fromUser: store.state.auth.user.username
    };
    socket.emit("message", message_out);
  };

  function isDifferentUser(index, message) {
    if(index > 0) {
      return message.fromUser !== store.state.chat.messages[index - 1].fromUser;
    }
    return true;
  }

  function isCurrentUser(message) {
    return message.fromUser === store.state.auth.user.username;
  }

  const heightClass = props.isRoom ? "h-96" : "h-80";

</script>

<template>
  <div id="chat-window" :class="`flex flex-col flex-grow justify-end bg-slate-200 p-2 ${heightClass}`">
    <div v-if="usersOnline" class="text-xs text-gray-600 mb-1 h">
      Users online: {{usersOnline}}
    </div>
    <div ref="chatMessages" id="chat-messages" class="flex flex-col overflow-scroll m-2">
      <div v-for="(message, index) in store.state.chat.messages" :key="message" class="">
        <div v-if="isDifferentUser(index, message)" 
          :class="`mt-3 text-2xs uppercase ${isCurrentUser(message) ? 'text-blue-500': 'text-gray-600' }`"
        >
          {{message.fromUser}}
        </div>
        <div class="text-sm text-gray-800">
          <Message :message="`${message.message}`"/>
        </div>
      </div>
    </div>

    <CommentBox class="" @sendMessage="sendMessage"/>
  </div>
</template>