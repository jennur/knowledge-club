<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import highlightSort from "@/helpers/highlightFunctions/highlightSort.js";
  import store from "@/store/index.js";
  import Note from "./Note.vue";

  const storeHighlights = computed(() => store.state.chapters.focusedChapter.highlights);
  const highlights = computed(() => {
    let highlightList = storeHighlights.value;
    return highlightList.sort(highlightSort).reverse();
  });
</script>

<template>
  <div>
    <div v-for="highlight in highlights" :key="highlight.highlightId">
      <Note :highlightText="highlight.content" :articles="highlight.articles"/>
    </div>
  </div>
</template>