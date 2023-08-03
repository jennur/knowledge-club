<script setup>
  import httpCommon from "../../../http-common";
  import Book from "../Book/Book.vue";
  import { ref, onBeforeMount } from "vue";

  const props = defineProps({
      headline: String,
      params: Object,
      manager: Boolean
  })

  const books = ref([]);

  function getBookList() {
    httpCommon.get("/books", { params: props.params })
      .then(response => {
        books.value = response.data;
      })
      .catch(error => {
        console.error("[Y]", error.message);
      })
  }


  onBeforeMount(() => getBookList());

</script>
<template>
  <div>
    <h2 class="text-xs mb-2 text-slate-500 uppercase font-semibold ml-2">{{ props.headline }}</h2>
    <div class="flex flex-wrap">
      <div 
        v-for="book in books"
        :key="book.title"
        class="flex basis-1/2 sm:basis-1/4 lg:basis-1/8 mb-6"
      >
        <Book :book="book" :manager="manager" @remove="getBookList"/>
      </div>
    </div>
  </div>
</template>
