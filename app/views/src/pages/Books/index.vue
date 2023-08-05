<script setup>
  import store from "../../store/index";
  import BooksList from "../../components/Books/BooksList/BooksList.vue"
  import categories from "./categories";

  store.dispatch("books/getAllBooks")
</script>
<template>
  <div>
    <div class="bg-slate-100 py-8">
      <div class="container mx-auto px-4">
        <h1>Categories</h1>
        <div class="text-sm text-blue-600">
          <a 
            v-for="category in categories()"
            :key="category.value"
            :href="`#${category.value}`" 
            class="mr-4"
          >
            {{ category.title }}
          </a>
        </div>
      </div>
    </div>
    <div 
      v-for="category in categories()"
      :key="category.value"
      class="bg-slate-50 py-8 px-4"
    >
      <BooksList
        class="container mx-auto"
        :params="{
          limit: 8,
          order: JSON.stringify([['createdAt', 'DESC']]),
          category: category.value
        }"
        :headline="category.title"
        :id="category.value"
      />
    </div>
    <!-- <div class="bg-blue-50 py-8 px-4">
      <BooksList
        class="container mx-auto"
        :params="{
          limit: 8,
          order: JSON.stringify([['createdAt', 'DESC']]),
          category: 'physics'
        }"
        headline="Physics"
        id="physics"
      />
    </div>
    <div class="bg-slate-50 py-8 px-4">
      <BooksList
        class="container mx-auto"
        :params="{
          limit: 8,
          order: JSON.stringify([['createdAt', 'DESC']]),
          category: 'psychology'
        }"
        headline="Psychology"
        id="psychology"
      />
    </div>
    <div class="bg-blue-50 py-8 px-4">
      <BooksList
        class="container mx-auto"
        :params="{
          limit: 8,
          order: JSON.stringify([['createdAt', 'DESC']]),
          category: 'religion'
        }"
        headline="Religion"
        id="religion"
      />
    </div> -->
  </div>
</template>

<style>

</style>
