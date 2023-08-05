<script setup>
  import { ref } from 'vue'
  import MarkdownEditor from "../../Inputs/MarkdownEditor.vue";
  import IconButton from "../../Buttons/IconButton.vue";
  import Quotes from "../../Quotes/Quotes.vue";

  const emit = defineEmits(["save"]);

  const props = defineProps({
    highlight: {
      type: Object
    }, 
    savingError: {
      type: String
    }
  })

  const markdown = ref("");

  function setInput(value) {
    markdown.value = value;
  }

  function saveNote() {
    emit("save", { note: markdown.value, highlight: props.highlight });
  }
</script>

<template>
  <div class="new-note">
    <div v-if="highlight?.content">
      <div class="highlight-text">
        <Quotes>{{ highlight.content }}</Quotes>
      </div>
    </div>
    <div v-else class="select-text-note">
      <p>
        Select some text to add a note!
      </p>
    </div>

    <MarkdownEditor class="max-h-full" @markdown="setInput" />
    <div class="flex items-center justify-end mt-2">
      <p v-if="savingError" class="text-red-700 bg-red-100 py-1 px-2 text-sm mr-2">
        {{ savingError }}
      </p>
      <IconButton 
        :disabled="!highlight?.content"
        dark
        buttonText="Save"
        size="sm"
        iconClass="floppy-disk"
        @click="saveNote" 
      />
    </div>
  </div>
</template>

<style lang="postcss">
  .select-text-note {
    @apply bg-emerald-100 w-full text-slate-800 py-4 px-6 rounded-t;
  }

  .new-note {
    @apply flex flex-col;
  }

  .new-note .highlight-text {
    @apply py-4 px-6 bg-blue-100 rounded-t;
  }
</style>