<script setup>
import { ref } from 'vue'
import IconButton from "../Buttons/IconButton.vue";
const emit = defineEmits(["switchTab"]);
</script>

<template>
  <div class="toolbar">
      <IconButton
        vertical
        size="lg"
        class="tool-button"
        iconClass="fas fa-folder-open"
        ariaLabel="Open menu at notes tab"
        @click="emit('switchTab', 'notes')"
      />

      <IconButton
        vertical
        size="lg"
        class="tool-button"
        iconClass="fas fa-eye"
        ariaLabel="Open menu at highlights tab"
        @click="emit('switchTab', 'highlights')"
      />

      <IconButton
        vertical
        size="lg"
        class="tool-button"
        iconClass="fas fa-file-circle-plus"
        ariaLabel="Open menu at notes tab"
        @click="emit('switchTab', 'add-note')"
      />

      <IconButton
        vertical
        size="lg"
        class="tool-button"
        iconClass="fas fa-comment"
        ariaLabel="Open menu at notes tab"
        @click="emit('switchTab', 'chat')"
      />
  </div>
</template>

<style lang="postcss" scoped>

  .toolbar {
    @apply flex flex-col w-16;
  }

  .toolbar .tool-button {
    @apply hover:text-black overflow-hidden;
  }

</style>