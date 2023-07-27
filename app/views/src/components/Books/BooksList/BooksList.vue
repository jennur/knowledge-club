<script setup>
  import httpCommon from "../../../http-common";
  import Book from "../Book/Book.vue";
  import { ref } from "vue";

  const props = defineProps({
      headline: String,
      params: Object,
  })

  const books = ref([]);

  httpCommon.get("/books", { params: props.params })
    .then(response => {
      console.log("Response", response.data);
      books.value = response.data;
    })
    .catch(error => {
      console.log("Error fetching books:", error.message);
    })
</script>
<template>
  <div>
    <h2 class="text-xs mb-2 text-slate-500 uppercase font-semibold ml-2">{{ props.headline }}</h2>
    <div class="flex flex-wrap">
      <div 
        v-for="book in books"
        :key="book.title"
        class="basis-1/2 sm:basis-1/4 lg:basis-1/8 mb-6"
      >
        <Book :book="book" />
      </div>
    </div>
  </div>
</template>

<style>

</style>
