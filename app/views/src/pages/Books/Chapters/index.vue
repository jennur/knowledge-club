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
       {{chapter.chapterNumber}} : {{chapter.chapterName}}
      </div>
  </div>
</template>

<style>

</style>

