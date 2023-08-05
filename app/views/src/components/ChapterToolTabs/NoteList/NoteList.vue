<script setup>
  import { computed } from 'vue'
  import store from "@/store/index.js";
  import Note from "./Note.vue";

  const highlights = computed(() => store.state.chapters.focusedChapter.highlights);
</script>

<template>
  <div id="notes-list">
    <p v-if="!highlights.length" class="select-text-note">
      To start adding notes, select some text from the chapter!
    </p>

    <Note 
      v-for="highlight in highlights"
      :key="highlight.highlightId"
      :highlightText="highlight.content"
      :highlightId="highlight.highlightId"
      :articles="highlight.articles"
    />
  </div>
</template>

<style lang="postcss" scoped>
  .select-text-note {
    @apply bg-emerald-100 w-full text-slate-800 py-4 px-6 rounded;
  }
</style>