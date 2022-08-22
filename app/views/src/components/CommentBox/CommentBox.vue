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
  <div class="flex w-full">
    <div class="bg-slate-100 relative w-full h-10">
      <textarea 
        v-model="input"
        class="w-full h-full bg-inherit p-2 resize-none text-md focus:outline-none"
      >
      </textarea>

      <DiscordPicker 
        class="emoji-picker absolute right-2 bottom-2" 
        :value="value" 
        @emoji="setEmoji" 
        @update:value="value = $event"
      />
    </div>
      <IconButton 
          dark
          @click="sendMessage" 
          buttonText="Send" 
          iconClass="fas fa-share-from-square"
        />
  </div>
</template>

<style scoped>

.emoji-picker {

}
</style>