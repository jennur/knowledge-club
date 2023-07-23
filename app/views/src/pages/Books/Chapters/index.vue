<script setup>
  import store  from "../../../store/index"
  import { useRoute } from "vue-router";
  import { computed } from 'vue'

  const route = useRoute();
  const bookId = route.params.id;

  store.dispatch("chapters/getAllChapters", bookId);
  store.dispatch("chapters/getFocusedBook", bookId);
  const book = computed(() => store.state?.chapters?.focusedBook);
  const metadata = computed(() => book.value && JSON.parse(book.value.metadata))
  const languages = computed(() => book.value && JSON.parse(book.value.languages))

</script>

<template>
  <div class="outer-content-wrapper pt-16 pb-16">
    <div class="flex flex-col md:flex-row">
      <div class="basis-full md:basis-1/3">
        <div class="border border-slate-200 p-4 flex items-center justify-center">
          <img src="/book-cover.jpeg" alt=""/>
        </div>

        <div class="bg-yellow-50 p-4 text-sm text-slate-800">
          <ul>
            <li v-if="book.title">
              <b>Title:</b> {{ book.title }}
            </li>
            <li v-if="metadata?.author">
              <b>Author:</b> {{ metadata.author }}
            </li>
            <li v-if="metadata?.producer">
              <b>Producer:</b> {{ metadata.producer }}
            </li>
            <li v-if="languages">
              <b>Languages: </b> 
              <span 
                v-for="lang, index in languages" 
                :key="lang[0]"
                class="capitalize"
              >
                <span v-if="index > 0">, </span>
                {{ lang[0] }}
              </span>
            </li>
            <li v-if="book?.numPages">
              <b>Number of pages:</b> {{ book.numPages }}
            </li>
          </ul>
        </div>
      </div>

      <div class="basis-full md:basis-1/2 lg:basis-2/3 md:pl-8 lg:pl-16 pt-16 md:pt-0">
        <h1 class="">{{ book?.title }}</h1>
        <h2 class="mt-6 uppercase text-sm text-gray-400">Chapters</h2>
        <div class="ml-4 mt-4">
          <RouterLink 
            v-for="chapter in store.state.chapters.chapters" 
            :key="chapter"
            :to="{ name: 'chapter', params: { id: bookId, chapterNum: chapter.chapterNumber }}"
            class="flex items-center max-w-max text-black-500 group mb-4"
            >
            <span class="w-12 text-3xl font-thin group-hover:font-bold">
              {{chapter.chapterNumber + 1}}
            </span> 
            <span class="text-2xl font-light" v-html="chapter.chapterName"></span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
  span.page-range {
    @apply text-slate-400 text-sm;
  }
</style>

