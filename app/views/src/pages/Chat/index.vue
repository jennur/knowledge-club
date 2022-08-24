<script setup>
  import { ref } from "vue"
  import { sendMessage } from "./chat.js"
  import CommentBox from "../../components/CommentBox/CommentBox.vue"
  import IconButton from "../../components/Buttons/IconButton.vue"

  const textInput = ref("");
  function checkValue(value) {
    console.log("Value:", value);

  }
</script>

<template>
  <div>
    <h1 class="text-lg mb-2">Chat room</h1>
    <div id="chat-window" class="border border-slate-200 p-4">
      <div class="chat-message">
        <div id="output"></div>
        <div id="feedback"></div>
      </div>

      <div>
        <ul id="all_messages"></ul>
      </div>

      <CommentBox @sendMessage="sendMessage"/>
    </div>
    <div class="online">
      <p class="users-online">Users Online</p>
      <div class="users">
      </div>
    </div>
</div>
</template>

<style>

</style>
