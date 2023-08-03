<script setup>
  import store from "@/store/index";
  import AddBooks from "@/components/Books/AddBooks/AddBooks.vue"
  import BookList from "@/components/Books/BooksList/BooksList.vue"
</script>
<template>
  <div class="outer-content-wrapper py-16">
    <h1>Document manager</h1>

    <h2>Add new document</h2>
    <AddBooks />

    <h2>Remove available documents</h2>
    <BookList 
      manager
      :params="{
        order: JSON.stringify([['createdAt', 'DESC']])
      }"
    />
  </div>
</template>