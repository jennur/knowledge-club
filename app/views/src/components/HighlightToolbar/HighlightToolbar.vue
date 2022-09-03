<script setup>
import { ref } from 'vue'
import IconButton from "../Buttons/IconButton.vue";
const emit = defineEmits(["saveHighlight", "addNote"]);
const props = defineProps({})
</script>

<template>
  <div class="h-toolbar">

      <IconButton
        vertical
        id="btn-save-highlights"
        class="tool-button"
        iconClass="fas fa-floppy-disk"
        ariaLabel="Save highlight"
        @click="emit('saveHighlight')"
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

  .h-toolbar {
    @apply flex max-w-max rounded-3xl bg-slate-300 px-2 mt-1 shadow-md;
  }

  .h-toolbar .tool-button {
    @apply relative px-2;
  }

  .h-toolbar .tool-button::after {
    @apply opacity-0 top-0 translate-y-0 transition-opacity duration-500;
  }

  .h-toolbar .tool-button:hover::after {
    @apply opacity-100 absolute translate-y-9 left-0 w-max
      text-xs bg-gray-600 text-white py-1 px-2 z-30;
  }

  .h-toolbar #btn-save-highlights.tool-button:hover::after {
    content: "Save highlight";
  }
  .h-toolbar #btn-add-note.tool-button:hover::after {
    content: "Add note";
  }
</style>