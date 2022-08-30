<script setup>
  import store from "../../store/index";
  import BooksList from "../../components/Books/BooksList/BooksList.vue"

  store.dispatch("books/getAllBooks")
</script>
<template>
<div>
    <div class="bg-slate-50 p-4">  
    <BooksList
      class="container mx-auto"
      :books="store.state.books.books" 
      headline="Newly added books"
    />
    </div>
  </div>
</template>

<style>

</style>
