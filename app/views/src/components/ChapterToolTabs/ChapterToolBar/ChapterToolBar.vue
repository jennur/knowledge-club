<script setup>
import { ref } from 'vue'
import IconButton from "../../Buttons/IconButton.vue";
const emit = defineEmits(["switchTab"]);
const props = defineProps({
  activeTab: String
})

function isActive(tabName) {
  return tabName === props.activeTab;
}

const tabs = [
  { name: "notes", icon: "fas fa-folder-open" },
  { name: "add-note", icon: "fas fa-file-circle-plus" },
  { name: "highlights", icon: "fas fa-eye" },
  { name: "chat", icon: "fas fa-comment" }
]

</script>

<template>
  <div class="toolbar">
      <IconButton
        v-for="tab in tabs"
        :key="tab.name"
        vertical
        size="lg"
        :class="`tool-button ${isActive(tab.name) ? 'active' : ''}`"
        :iconClass="tab.icon"
        :ariaLabel="`Open menu at ${tab.name} tab`"
        @click="emit('switchTab', tab.name)"
      />
  </div>
</template>

<style lang="postcss" scoped>

  .toolbar {
    @apply flex flex-col w-16;
  }

  .toolbar .tool-button {
    @apply hover:text-black overflow-hidden z-30;
  }

  .toolbar .tool-button.active {
    @apply text-blue-500;
  }

</style>