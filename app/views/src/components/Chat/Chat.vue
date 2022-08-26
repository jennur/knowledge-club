<script setup>
  import { io } from "socket.io-client";
  import { ref } from "vue"
    import faker from "faker"
  import CommentBox from "../../components/CommentBox/CommentBox.vue"
  import IconButton from "../../components/Buttons/IconButton.vue"
  import store from "../../store/index"

  const props = defineProps({
    isRoom: Boolean
  })
  const messages = ref([]);

  // messages.value = store.state.
  store.dispatch("chat/getChatRoomMessages");

  const fakeUserName = faker.name.firstName()
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
            roomid:"1",
            message:msg,
            timesent:Date(),
            fromuser:fakeUserName
            };
    socket.emit("message",message_out);
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
        <div v-for="message in store.state.chat.messages" :key="message" class=" mb-2">
          {{message.fromuser}} : {{message.message}}
        </div>
      </div>

      <CommentBox class="" @sendMessage="sendMessage"/>
    </div>

</div>
</template>