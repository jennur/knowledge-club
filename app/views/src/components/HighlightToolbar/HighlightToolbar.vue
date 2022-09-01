<script setup>
import { ref } from 'vue'
import IconButton from "../Buttons/IconButton.vue";
const emit = defineEmits(["toggleHighlights", "addNote"]);
const props = defineProps({
  hlVisible: {
    type: Boolean,
    default: false
  }
})
const { hlVisible } = props;
const hlBtnClass = hlVisible ? "visible" : "";
const hlIconClass = hlVisible ? "fa-eye-slash" : "fa-eye";
const hlAriaLabel = hlVisible ? "Hide highlights" : "Show highlights";
</script>

<template>
  <div class="toolbar">

      <IconButton
        vertical
        size="sm"
        id="btn-show-highlights"
        :class="`tool-button ${hlBtnClass}`"
        :iconClass="`fas ${hlIconClass}`"
        :ariaLabel="hlAriaLabel"
        @click="emit('toggleHighlights')"
      />

      <IconButton
        vertical
        id="btn-add-note"
        class="tool-button"
        iconClass="fas fa-note-sticky"
        ariaLabel="Add chapter note"
        @click="emit('addNote')"
      />

  </div>
</template>

<style lang="postcss" scoped>

  .toolbar {
    @apply flex max-w-max rounded-3xl bg-slate-300 px-2 
      md:flex-col md:max-w-min md:px-0 md:py-1;
  }

  .toolbar .tool-button {
    @apply relative px-2;
  }

  .toolbar .tool-button::after {
    @apply opacity-0 top-0 translate-y-0 transition-opacity duration-500;
  }

  .toolbar .tool-button:hover::after {
    @apply opacity-100 absolute translate-y-9 left-0 w-max text-xs bg-gray-600 text-white py-1 px-2
      md:translate-y-1 md:translate-x-8;
  }

  .toolbar #btn-show-highlights.tool-button:hover::after {
    content: "Show highlights";
  }
  .toolbar #btn-show-highlights.tool-button.visible:hover::after {
    content: "Hide highlights";
  }
  .toolbar #btn-add-note.tool-button:hover::after {
    content: "Add note";
  }
</style>