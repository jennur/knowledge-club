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
  store.dispatch("chat/getChatRoomMessages",props.roomId);

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

  const heightClass = props.isRoom ? "h-96" : "h-80";
</script>

<template>
  <div id="chat-window" :class="`flex flex-col flex-grow justify-end border border-slate-200 p-2 ${heightClass}`">
    <div v-if="usersOnline" class="text-xs text-slate-500 mb-1 h">
      Users online: {{usersOnline}}
    </div>
    <div ref="chatMessages" id="chat-messages" class="flex flex-col overflow-scroll m-2">
      <div 
        v-for="message in store.state.chat.messages" 
        :key="message"
        class="mb-2"
      >
        <div :class="`text-2xs uppercase ${message.fromUser === store.state.auth.user.username ? 'text-blue-500': 'text-slate-500' }`">
          {{message.fromUser}}
        </div>
        <div class="">
          <Message :message="`${message.message}`"/>
        </div>
      </div>
    </div>

    <CommentBox class="" @sendMessage="sendMessage"/>
  </div>
</template>