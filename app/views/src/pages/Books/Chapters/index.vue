<script setup>
  import store  from "../../../store/index"
  import {useRoute} from "vue-router";
  const route = useRoute();
  const bookId = route.params.id;

  store.dispatch("chapters/getAllChapters", bookId);
  store.dispatch("chapters/getFocusedBook", bookId);

</script>
<template>
  <div class="outer-content-wrapper pt-16 pb-16">
    <div class="flex flex-wrap items-center">
      <div class="self-stretch border border-slate-200 rounded-3xl p-4 basis-full md:basis-1/2 lg:basis-1/3 flex items-center justify-center">
        <img src="/book-cover.jpeg" alt=""/>
      </div>

      <div class="basis-full md:basis-1/2 lg:basis-2/3 px-16 pt-16 md:pt-0">
        <h1 class="">{{ store.state?.chapters?.focusedBook?.title }}</h1>
        <h2 class="mt-6 uppercase text-sm text-gray-400">Chapters</h2>
        <div class="ml-4 mt-4">
          <RouterLink 
            v-for="chapter in store.state.chapters.chapters" :key="chapter"
            :to="`/books/${bookId}/chapters/${chapter.chapterNumber}`"
            class="flex items-center max-w-max text-black-500 group mb-4"
            >
            <span class="w-12 text-3xl font-thin group-hover:font-bold">
              {{chapter.chapterNumber}}
            </span> 
            <span class="text-2xl font-light">
              {{chapter.chapterName}}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>

