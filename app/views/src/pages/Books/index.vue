<script setup>
  import CategoryBooksBlock from "../../components/Books/CategoryBooksBlock/CategoryBooksBlock.vue"
  import categoriesJSON from "@/config/categories.json";

  const categories = Object.values(categoriesJSON);

</script>
<template>
  <div>
    <div class="bg-slate-100 py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-slate-700 m-0">Available books in categories</h1>
      </div>
    </div>
    <div class="bg-slate-50 py-8 px-4">
       <div class="outer-content-wrapper px-0 md:px-2 py-8">
          <div class="flex flex-wrap justify-between">
            <CategoryBooksBlock
              v-for="category in categories"
              :key="category.value"
              :category="category.value"
              :headline="category.name"
              class="mb-[2%]"
            />
          </div>
        </div>
    </div>
  </div>
</template>

<style>

</style>
