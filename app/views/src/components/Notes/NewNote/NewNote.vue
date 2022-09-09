<script setup>
  import { ref } from 'vue'
  import MarkdownEditor from "../../Inputs/MarkdownEditor.vue";
  import SimpleButton from "../../Buttons/SimpleButton.vue";

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
  <div class="new-note flex flex-col">
    <div v-if="highlight?.text" class="mb-2">
      <p class="highlight-text p-2 bg-blue-100">"{{ highlight.text }}"</p>
    </div>

    <MarkdownEditor class="max-h-full" @markdown="setInput" />
    <div class="self-end mt-2">
      <SimpleButton dark buttonText="Save" @click="saveNote" />
    </div>
  </div>
</template>