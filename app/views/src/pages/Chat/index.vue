<script setup>
  import blah from "./chat.js"
</script>
<template>
  <body>
    <h1 class="room-message"></h1>
    <div class="window">
        <div class="chat-message">
            <div id="output"></div>
            <div id="feedback"></div>
        </div>
        <div class='fields'>
            <input type="text" id="message" placeholder="Enter message">
            <button id="send" @click="blah">Send</button>
        </div>
        <div>
            <ul id="all_messages"></ul>
        </div>
    </div>
    <div class="online">
        <p class="users-online">Users Online</p>
        <div class="users">
        </div>
    </div>
</body>
</template>

<style>

</style>
