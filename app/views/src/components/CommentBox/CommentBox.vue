<script setup>
  import { ref, defineEmits } from "vue"
  import DiscordPicker from "vue3-discordpicker"
  import IconButton from "../Buttons/IconButton.vue"

  const emit = defineEmits(["sendMessage", "inputValue"]);
  const { placeholder } = defineProps({ 
    placeholder: { type: String}
    })
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
    <div class="text-input-wrapper">
      <input
        type="text" 
        v-model="input"
        :placeholder="placeholder"
        class="text-input"
      />

      <!-- <DiscordPicker 
        class="emoji-picker absolute right-2 bottom-2" 
        :value="value" 
        @emoji="setEmoji" 
        @update:value="value = $event"
      /> -->
    </div>
      <IconButton
        type="submit"
        dark
        ariaLabel="Send message" 
        iconClass="fas fa-paper-plane"
        class="pl-3 pr-2 rounded-tl-none rounded-bl-none"
      />
  </form>
</template>

<style lang="postcss" scoped>
  .text-input-wrapper {
    @apply rounded-tl rounded-bl bg-slate-100 relative w-full h-10;
  }
  .text-input {
    @apply w-full rounded-tl rounded-bl  text-gray-800 bg-inherit pt-2 pl-2 pb-2 pr-10 text-sm focus:outline-none;
  }
  .emoji-picker {

  }
</style>