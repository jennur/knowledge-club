<script setup>
  import store  from "../../../store/index"
  import {useRoute} from "vue-router";
  const route = useRoute();
  store.dispatch("chapters/getAllChapters",route.params.id)


</script>
<template>
  <div class="about">
    <h1>{{$route.params.id}}</h1>
    <div v-for="chapter in store.state.chapters.chapters" :key="chapter" class="mt-4">
       {{chapter.chapterNumber}} : {{chapter.chapterName}}
      </div>
  </div>
</template>

<style>

</style>

