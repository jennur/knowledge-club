<script setup>
  import { ref } from 'vue'
  import MarkdownEditor from "../../Inputs/MarkdownEditor.vue";
  import SimpleButton from "../../Buttons/SimpleButton.vue";
  import Quotes from "../../Quotes/Quotes.vue";

  const emit = defineEmits(["save"]);

  const props = defineProps({
    highlight: {
      type: Object,
      default: null
    }
  })

  const markdown = ref("");

  function setInput(value) {
    markdown.value = value;
  }

  function saveNote() {
    emit("save", { 
      note: markdown.value,
      highlight: props.highlight
    });
  }
</script>

<template>
  <div class="new-note">
    <div v-if="highlight?.text">
      <div class="highlight-text">
        <Quotes>{{ highlight.text }}</Quotes>
      </div>
    </div>
    <div v-else>
      <p class="bg-emerald-100 text-slate-800 py-4 px-6 max-w-max mb-2">
        Select some text to add a note!
      </p>
    </div>

    <MarkdownEditor class="max-h-full" @markdown="setInput" />
    <div class="self-end mt-2">
      <SimpleButton :disabled="!highlight?.text" dark buttonText="Save" @click="saveNote" />
    </div>
  </div>
</template>

<style lang="postcss">

  .new-note {
    @apply flex flex-col;
  }

  .new-note .highlight-text {
    @apply p-2 bg-blue-100;
  }
</style>