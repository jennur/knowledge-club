<script setup>
  import store from "@/store/index"
  import { computed } from 'vue'

  const props = defineProps({
    bookId: {
      type: String,
      required: true
    },
    chapterNum: {
      type: String,
      required: true
    }
  })
  const numChapters = computed(() => store.state.chapters.chapters.length);
  const { bookId, chapterNum } = props;
  const isFirstChapter = parseInt(chapterNum) - 1 < 0;
  const isLastChapter = parseInt(chapterNum) + 1 === numChapters;
</script>

<template>
  <div class="text-xs uppercase text-gray-400">
    <span v-if="!isFirstChapter">
      <font-awesome-icon :icon="['fas', 'caret-left']" />
      <RouterLink 
        :to="{ name: 'chapter', params: { id: bookId, chapterNum: parseInt(chapterNum) - 1 }}"
        class="hover:underline ml-1"
      >Previous chapter</RouterLink>
    </span>

    <span v-if="!isFirstChapter && !isLastChapter" class="mx-1">|</span>

    <span v-if="!isLastChapter">
      <RouterLink 
        :to="{ name: 'chapter', params: { id: bookId, chapterNum: parseInt(chapterNum) + 1 }}"
        class="hover:underline mr-1"
      >Next chapter</RouterLink>
      <font-awesome-icon :icon="['fas', 'caret-right']" />
    </span>
  </div>
</template>