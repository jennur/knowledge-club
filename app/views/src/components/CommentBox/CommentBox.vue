<script setup>
  import { ref, defineEmits } from "vue"
  import DiscordPicker from "vue3-discordpicker"
  import IconButton from "../Buttons/IconButton.vue"

  const emit = defineEmits(["sendMessage", "inputValue"]);
  const value = ref("");
  const input = ref("")

  function setEmoji(emoji) {
    console.log("Emoji:", emoji);
    console.log("Input:", input)
    input.value+=emoji;
  }

  function sendMessage(){
    emit('sendMessage', input.value);
    input.value = null;
  }

</script>

<template>
  <form class="flex w-full" @submit.prevent="sendMessage">
    <div class="bg-slate-100 relative w-full h-10">
      <input
        type="text" 
        v-model="input"
        class="w-full text-gray-800 bg-inherit pt-2 pl-2 pb-2 pr-10 text-sm focus:outline-none"
      />

      <DiscordPicker 
        class="emoji-picker absolute right-2 bottom-2" 
        :value="value" 
        @emoji="setEmoji" 
        @update:value="value = $event"
      />
    </div>
      <IconButton
        type="submit"
        dark
        ariaLabel="Send message" 
        iconClass="fas fa-paper-plane"
        class="border-l border-white pl-3 pr-2"
      />
  </form>
</template>

<style scoped>

.emoji-picker {

}
</style>