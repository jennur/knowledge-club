<script setup>
   import store  from "../../store/index"
   var data = store.dispatch("books/getAllBooks");
   console.log(store.state.books);
</script>
<template>
  <div class="about">
    <h1>All books</h1>
    <div v-for="book in store.state.books.books[0]" :key="book.title" class="mt-4">
      {{book.title}}
      </div>
  </div>
</template>

<style>

</style>
