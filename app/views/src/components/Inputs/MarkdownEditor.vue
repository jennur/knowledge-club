<script setup>
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import { ref, computed } from 'vue'

  const emit = defineEmits(["markdown"])
  const input = ref("# My note")
  const compiledMarkdown = computed(() => {
    let sanitizedInput = DOMPurify.sanitize(input.value);
    return marked(sanitizedInput);
  });

  function update(event) {
    input.value = event.target.value;
    emit("markdown", input.value);
  }
</script>

<template>
  <div class="flex w-full max-w-full">

    <textarea class="editor basis-1/2" :value="input" @input="update"></textarea>

    <div class="compiled basis-1/2" v-html="compiledMarkdown"></div>
  </div>
</template>

<style lang="postcss">

  .editor {
    @apply w-full min-h-[12rem] max-h-full p-4 focus:outline-none
      border-slate-400 border-r-2 bg-slate-200 rounded-bl;
  }

  .compiled {
    @apply p-4 bg-white max-h-full overflow-scroll rounded-br;
  }

  .compiled h2 {
    @apply mt-4 mb-1 font-normal;
  }

  .compiled h3 {
    @apply mt-4 mb-1 font-medium;
  }

  .compiled ul,
  .compiled ol,
  .compiled dl {
    @apply pl-4 py-2;
  }

  .compiled ul li, 
  .compiled ol li {
    @apply ml-2;
  }

  .compiled ul {
    @apply list-disc;
  }

  .compiled ol {
    @apply list-decimal;
  }

  .compiled code {
    @apply text-sm bg-slate-100 p-1 my-2;
  }

  .compiled pre {
    @apply text-sm bg-slate-100 border border-slate-300 p-2 my-2;
  }

  .compiled blockquote {
    @apply bg-slate-100 border-l-4 border-slate-300 p-2;
  }
</style>