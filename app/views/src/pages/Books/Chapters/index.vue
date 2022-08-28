<script setup>
  import store  from "../../../store/index"
  import {useRoute} from "vue-router";
  const route = useRoute();
  const bookId = route.params.id;
  store.dispatch("chapters/getAllChapters", bookId);

  
</script>
<template>
  <div class="container mx-auto p-4">
    <h1>{{ bookId }}</h1>
    <div v-for="chapter in store.state.chapters.chapters" :key="chapter" class="mt-4">
      <RouterLink :to="`/books/${chapter.bookUUID}/chapters/${chapter.chapterNumber}`" class="text-xl text-rose-500 py-2 mr-6">
       {{chapter.chapterNumber}} : {{chapter.chapterName}}
      </RouterLink>
      </div>
  </div>
</template>

<style>

</style>

