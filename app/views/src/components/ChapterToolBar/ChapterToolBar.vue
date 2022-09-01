<script setup>
import { ref } from 'vue'
import IconButton from "../Buttons/IconButton.vue";
const emit = defineEmits(["openSlider", "toggleSlider"]);
const props = defineProps({})
</script>

<template>
  <div class="toolbar">
      <IconButton
        vertical
        size="md"
        class="tool-button"
        iconClass="fas fa-bars"
        ariaLabel="Open menu"
        @click="emit('toggleSlider')"
      />

      <IconButton
        vertical
        size="md"
        class="tool-button"
        iconClass="fas fa-folder-open"
        ariaLabel="Open menu at notes tab"
        @click="emit('openSlider', 'notes')"
      />

      <IconButton
        vertical
        size="md"
        class="tool-button"
        iconClass="fas fa-eye"
        ariaLabel="Open menu at highlights tab"
        @click="emit('openSlider', 'highlights')"
      />

      <IconButton
        vertical
        size="md"
        class="tool-button"
        iconClass="fas fa-file-circle-plus"
        ariaLabel="Open menu at notes tab"
        @click="emit('openSlider', 'add-note')"
      />

      <IconButton
        vertical
        size="md"
        class="tool-button"
        iconClass="fas fa-comment"
        ariaLabel="Open menu at notes tab"
        @click="emit('openSlider', 'chat')"
      />
  </div>
</template>

<style lang="postcss" scoped>

  .toolbar {
    @apply flex flex-col w-16 bg-slate-300;
  }

  .toolbar .tool-button {
    @apply hover:text-black overflow-hidden;
  }

</style>