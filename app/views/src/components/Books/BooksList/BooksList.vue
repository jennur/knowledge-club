<script setup>
  import Book from "../Book/Book.vue";
  const props = defineProps({
      books: {
          type: Array,
          required: true
      },
      headline: String
  })
</script>
<template>
  <div>
    <h2 class="text-xs mb-2 text-slate-500 uppercase font-semibold ml-2">{{ props.headline }}</h2>
    <div class="flex flex-wrap">
      <div 
        v-for="book in props.books" 
        :key="book.title" 
        class="basis-1/2 sm:basis-1/4 md:basis-1/4 lg:basis-1/6 mb-6"
      >
        <Book :book="book" />
      </div>
    </div>
  </div>
</template>

<style>

</style>
