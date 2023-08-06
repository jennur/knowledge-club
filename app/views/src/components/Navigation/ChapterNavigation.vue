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
    },
    category: {
      type: String,
      default: "no-category"
    }
  })
  
  const numChapters = computed(() => store.state.chapters.focusedBook?.numChapters);
  const { bookId, chapterNum } = props;
  const isFirstChapter = parseInt(chapterNum) === 0;
  const isLastChapter = parseInt(chapterNum) + 1 === numChapters.value;
</script>

<template>
  <div class="text-xs uppercase text-gray-400">
    <span v-if="!isFirstChapter">
      <font-awesome-icon :icon="['fas', 'caret-left']" />
      <RouterLink 
        :to="{
          name: 'category-chapter',
          params: {
            id: bookId,
            chapterNum: parseInt(chapterNum) - 1,
            category
          }
        }"
        class="hover:underline ml-1"
      >Previous chapter</RouterLink>
    </span>

    <span v-if="!isFirstChapter && !isLastChapter" class="mx-1">|</span>

    <span v-if="!isLastChapter">
      <RouterLink 
        :to="{
          name: 'category-chapter',
          params: {
            id: bookId, 
            chapterNum: parseInt(chapterNum) + 1,
            category
          }
        }"
        class="hover:underline mr-1"
      >Next chapter</RouterLink>
      <font-awesome-icon :icon="['fas', 'caret-right']" />
    </span>
  </div>
</template>