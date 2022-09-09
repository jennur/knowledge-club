<script setup>
import { ref, reactive, computed, watch } from 'vue'
import store from "@/store/index.js";

console.log("Store state:", store.state);
const highlights = computed(() => store.state.chapters.focusedChapter.highlights);
const numHighlights = highlights.length;
watch(highlights, (newVal, oldVal) => {
  console.log("NewVal:", newVal, "oldVal:", oldVal);

});
</script>

<template>
  <div>
    Note list component
  </div>
</template>