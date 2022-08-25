<script setup>
  import { io } from "socket.io-client";
  import { ref } from "vue"
  import CommentBox from "../../components/CommentBox/CommentBox.vue"
  import IconButton from "../../components/Buttons/IconButton.vue"

  const props = defineProps({
    isRoom: Boolean
  })
  const messages = ref([]);
  const usersOnline = ref(0);
  const chatMessages = ref(null);

  var socket = io(import.meta.env.VITE_BASE_URL);

  socket.on("connected", () => {
    console.log("User connected");
  })

  socket.on("message", (msg) => {
    console.log(msg);
    messages.value.push(msg);
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
  })

  socket.on("usersOnline", (number) => {
    console.log("Sockets:", number);
    usersOnline.value = number;
  })

  function sendMessage(message){
    socket.emit("message",message);
  };

  const heightClass = props.isRoom ? "h-96" : "h-80";
</script>

<template>
  <div>
    <div v-if="usersOnline" class="text-xs text-slate-500 mb-1 h">
      Users online: {{usersOnline}}
    </div>

    <div id="chat-window" :class="`flex flex-col justify-end border border-slate-200 p-4 ${heightClass}`">

      <div ref="chatMessages" id="chat-messages" class="overflow-scroll m-2">
        <div v-for="message in messages" :key="message" class=" mb-2">
          {{ message }}
        </div>
      </div>

      <CommentBox class="" @sendMessage="sendMessage"/>
    </div>

</div>
</template>