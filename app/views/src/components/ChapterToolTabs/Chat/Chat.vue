<script setup>
  import { io } from "socket.io-client";
  import { ref, computed, onBeforeUnmount, nextTick } from "vue"
  import CommentBox from "@/components/CommentBox/CommentBox.vue"
  import IconButton from "@/components/Buttons/IconButton.vue"
  import Message from "./Message.vue"
  import store from "@/store/index.js"
  import { chat } from "../../../store/chat.modules";
  
  const socket = io(import.meta.env.VITE_BASE_URL);

  const { isRoom, roomId } = defineProps({
    isRoom: Boolean,
    roomId: String
  })

  const usersOnline = ref(0);
  const errorMsg = ref(null);
  const connectedMsg = ref(null);

  const user = computed(() => store.state.auth.user);
  const messages = computed(() => store.state.chat.messages);

  const scrollChat = () => {
    const chatMessages = document.getElementById("chat-messages");
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 50);
  }

  store.dispatch("chat/getChatRoomMessages", roomId)
    .then(() => {
      errorMsg.value = null;
    })
    .catch(err => {
      console.error(err.message);
      errorMsg.value = "Unable to load chat messages"
    });

  socket.emit("joinRoom", roomId);

  socket.on("connected", () => {
    console.log("User connected");
    scrollChat();
  })

  socket.on("message", (msg) => {
    store.dispatch("chat/addMessageToState", msg);
    scrollChat();
  })

  socket.on("usersOnline", (number) => {
    console.log("USERS ONLINE:", number);
    usersOnline.value = number;
  })

  onBeforeUnmount(() => {
    socket.disconnect();
  })

  function sendMessage(msg) {
    let message_out = {
      roomId,
      message: msg,
      timesent: Date(),
      fromUser: user.value
    }
    socket.emit("message", message_out);
  };

  const heightClass = isRoom ? "h-96" : "h-80";
</script>

<template>
  <div class="flex flex-col h-full">
    <div id="chat-window" :class="`chat-window ${heightClass}`">
      <div v-if="usersOnline" class="user-count">
        Users online: {{ usersOnline }}
      </div>

      <div id="chat-messages" class="chat-messages">
        <div v-for="(message, index) in messages" :key="message" class="">
          <Message 
            :index="index" 
            :message="message" 
            :prevMessage="messages[index - 1]"
            :user="user"
          />
        </div>
      </div>

      <CommentBox placeholder="Write to chapter chat room" @sendMessage="sendMessage"/>

    </div>
  </div>
</template>

<style lang="postcss" scoped>
  .chat-window {
    @apply relative flex flex-col flex-grow justify-end rounded bg-slate-200 p-2 pt-8;
  }

  .chat-window .user-count {
    @apply absolute top-2 left-2 text-xs text-gray-600 mb-1;
  }

  .chat-messages {
    @apply flex flex-col overflow-scroll mx-2 mb-2;
  }
</style>

