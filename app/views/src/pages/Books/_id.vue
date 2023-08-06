<script setup>
  import store  from "@/store/index"
  import { RouterLink, useRoute } from "vue-router";
  import { computed } from 'vue'

  import BookCover from "@/components/Books/Book/BookCover.vue";
  import Breadcrumbs from "@/components/Navigation/Breadcrumbs.vue";
  import Spinner from "@/components/Loading/Spinner.vue";
  const route = useRoute();
  const bookId = route.params.id;
  const category = route.params.category;

  store.dispatch("chapters/getAllChapters", bookId);
  store.dispatch("chapters/getFocusedBook", bookId);
  const book = computed(() => store.state?.chapters?.focusedBook);
  const metadata = computed(() => book.value && JSON.parse(book.value.metadata))
  const languages = computed(() => book.value && JSON.parse(book.value.languages))
  const chapters = computed(() => store.state.chapters.chapters);
</script>

<template>
  <div class="outer-content-wrapper pt-8 pb-16">
    <Breadcrumbs 
      class="mb-16"
      :routes="[
        { title: 'Home', name: 'home'},
        { title: 'Books', name: 'books'},
        { title: category, name: 'category', params: { category }}
      ]"
      :current-route="book?.title"
    />

    <div class="flex flex-col sm:flex-row">
      <div class="basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
        <BookCover :bookId="bookId" />

        <div class="bg-yellow-50 p-4 text-sm text-slate-800">
          <ul>
            <li v-if="book?.title">
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

      <div class="basis-full sm:basis-2/3 md:basis-3/4 lg:basis-4/5 sm:pl-8 md:pl-8 lg:pl-16 pt-16 sm:pt-0">
        <h1 class="">{{ book?.title }}</h1>
        <h2 class="mt-6 uppercase text-sm text-gray-400">Pages</h2>
        <Spinner v-if="!chapters.length" text="Loading chapters" class="mt-4" />
        
        <div class="ml-4 mt-4">
          <RouterLink 
            v-for="chapter in chapters" 
            :key="chapter"
            :to="{
              name: 'category-chapter',
              params: {
                category,
                id: bookId,
                chapterNum: chapter.chapterNumber
              }}"
            class="flex items-center max-w-max text-black-500 group mb-2"
            >
            <span class="w-12 text-xl font-thin group-hover:font-bold">
              {{chapter.chapterNumber + 1}}
            </span> 
            <span class="text-lg font-light" v-html="chapter.chapterName"></span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
  span.page-range {
    @apply text-slate-400;
  }
  span.page-range::before {
    content: "(";
  }
    span.page-range::after {
    content: ")";
  }
</style>

