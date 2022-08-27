<script setup>
   import store  from "../../store/index"
   
   store.dispatch("books/getAllBooks")
</script>
<template>
  <div class="about">
    <h1>All books</h1>
    <div v-for="book in store.state.books.books" :key="book.title" class="mt-4">
      <RouterLink :to="`/books/${book.bookUUID}/chapters`" class="text-xl text-rose-500 py-2 mr-6">{{book.title}}</RouterLink>
      </div>
  </div>
</template>

<style>

</style>
