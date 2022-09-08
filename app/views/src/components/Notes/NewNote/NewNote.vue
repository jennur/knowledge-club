<script setup>
  import { ref } from 'vue'
  import MarkdownEditor from "../../Inputs/MarkdownEditor.vue";
  import SimpleButton from "../../Buttons/SimpleButton.vue";
  const props = defineProps({
    highlightText: {
      type: String,
      default: null
    }
  })

  function setInput() {
    console.log("Set input");
  }

  function saveNote() {
    console.log("Save note");
  }
</script>

<template>
  <div class="flex flex-col">
    <div v-if="highlightText" class="mb-2">
      <p class="p-2 bg-blue-100">"{{ highlightText }}"</p>
    </div>

    <MarkdownEditor class="max-h-full" @markdown="setInput" />
    <div class="self-end mt-2">
      <SimpleButton dark buttonText="Save" @click="saveNote" />
    </div>
  </div>
</template>