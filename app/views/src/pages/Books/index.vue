<script setup>
   import store  from "../../store/index"
   store.dispatch("books/getAllBooks")
</script>
<template>
  <div class="about">
    <h1>All books</h1>
    <div v-for="book in store.state.books.books" :key="book.title" class="mt-4">
      {{book.title}}
      </div>
  </div>
</template>

<style>

</style>
