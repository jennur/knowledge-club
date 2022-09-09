<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import store from "@/store/index.js";
  import Note from "./Note.vue";

  const highlights = computed(() => store.state.chapters.focusedChapter.highlights);
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