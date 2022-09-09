<script setup>
import { ref, reactive, computed, watch } from 'vue'
import store from "@/store/index.js";
import Note from "./Note.vue";

console.log("Store state:", store.state);
const highlights = computed(() => store.state.chapters.focusedChapter.highlights);
const numHighlights = highlights.length;
watch(highlights, (newVal, oldVal) => {
  console.log("NewVal:", newVal, "oldVal:", oldVal);

});
</script>

<template>
  <div>
    <div 
      v-for="highlight in store.state.chapters.focusedChapter.highlights" 
      :key="highlight.highlightId"
    >
      <Note :highlightText="highlight.content" :articles="highlight.articles"/>
    </div>
  </div>
</template>