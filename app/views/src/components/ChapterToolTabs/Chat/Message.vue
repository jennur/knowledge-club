<script setup>
  import { ref, defineProps } from "vue";

  const { message, index, prevMessage, user } = defineProps({
    message: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    prevMessage: {
      type: Object
    },
    user: {
      type: Object,
      required: true
    }
  });
  const formula = ref("$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$")

  function isDifferentUser(index, message) {
    if(prevMessage) {
      return message.fromUser.userId !== prevMessage.fromUser.userId;
    }
    return true;
  }

  function isCurrentUser(message) {
    return message.fromUser?.userId === user.userId;
  }

  function getFirstChar(string) {
    return string.charAt(0);
  }

  function getUserName(obj) {
    return obj?.username.trim() || obj.trim();
  }
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();

    return '#' + '00000'.substring(0, 6 - color.length) + color;
  }
</script>


<template>
  
<div>
  <div 
    v-if="isDifferentUser(index, message)"
    class="flex items-start mt-4 -mb-[0.8rem]"
  >
    <div class="avatar" :style="{ 
      backgroundColor: stringToColor(getUserName(message.fromUser))
      }"
    >
      <span class="char">
        {{getFirstChar(getUserName(message.fromUser))}}
      </span>
    </div>
    <div class="username">
      {{ getUserName(message.fromUser) }}
    </div>
  </div>
  <div class="message">
    <vue-mathjax :formula="message.message" />
  </div>
</div>
</template>

<style lang="postcss" scoped>
  .username {
    @apply text-xs text-blue-600 font-bold uppercase;
  }

  .avatar {
    @apply relative w-8 h-8 bg-blue-700 rounded-full mr-2 uppercase text-slate-100;
  }

  .avatar .char {
    @apply absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2;
  }

  .message {
    @apply ml-[2.5rem] text-sm text-gray-800;
  }
</style>