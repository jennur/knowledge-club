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
  { name: "notes", title: "Notes", icon: "fas fa-folder-open" },
  { name: "add-note", title: "Add note", icon: "fas fa-file-circle-plus" },
  { name: "highlights", title: "Highlights", icon: "fas fa-eye" },
  { name: "chat", title: "Chat", icon: "fas fa-comment" }
]

</script>

<template>
  <div class="toolbar">
    <div class="tool-button-wrapper" v-for="tab in tabs" :key="tab.name">
      <IconButton
        vertical
        size="lg"
        :class="`tool-button ${isActive(tab.name) ? 'active' : ''}`"
        :iconClass="tab.icon"
        :ariaLabel="`Open menu at ${tab.title} tab`"
        @click="emit('switchTab', tab.name)"
      />
      <!-- <span class="tooltip">{{tab.title}}</span> -->
    </div>
  </div>
</template>

<style lang="postcss" scoped>

  .toolbar {
    @apply w-16;
  }

  .toolbar .tool-button {
    @apply hover:text-black overflow-hidden z-30;
  }

  .toolbar .tool-button.active {
    @apply text-blue-500;
  }

  .toolbar .tool-button-wrapper {
    @apply relative flex justify-center;
  }

  .toolbar .tool-button-wrapper:hover .tooltip {
    @apply block;
    animation: pop-in .3s;
  }
  .toolbar .tool-button-wrapper .tooltip {
    @apply bg-gray-500 text-slate-100 py-1 
    my-1 px-2 text-xs absolute top-0 left-12 z-30 w-max rounded hidden;
  }

  .night .toolbar .tool-button-wrapper .tooltip {
    @apply bg-slate-600;
  }

  @keyframes pop-in {
    0% {
      opacity: 0;
      transform: translateX(-7px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>