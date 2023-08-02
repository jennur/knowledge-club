<script setup>
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import Quotes from "../../Quotes/Quotes.vue";
  
  const props = defineProps({
    highlightText: String,
    articles: Array
  })

  const getCompiledMarkdown = (text) => {
    let sanitizedInput = DOMPurify.sanitize(text);
    return marked(sanitizedInput);
  }
</script>

<template>
  <div class="note">
    <div v-if="highlightText" class="highlight-text">
      <Quotes>{{ highlightText }}</Quotes>
    </div>
    <div v-for="article in articles" :key="article.articleId">
      <div class="compiled" v-html="getCompiledMarkdown(article.description)"></div>
    </div>
  </div>
</template>

<style lang="postcss">
  .note .highlight-text {
    @apply p-2 mt-4 bg-blue-100;
  }
</style>