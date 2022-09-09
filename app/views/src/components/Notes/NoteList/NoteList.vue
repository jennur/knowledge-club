<script setup>
  import { computed } from 'vue'
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
  <div id="notes-list">
    <p v-if="!highlights.length" class="bg-emerald-100 text-slate-800 py-4 px-6 max-w-max">
      To start adding notes, select some text from the chapter!
    </p>

    <Note 
      v-for="highlight in highlights"
      :key="highlight.highlightId"
      :highlightText="highlight.content" 
      :articles="highlight.articles"
    />
  </div>
</template>