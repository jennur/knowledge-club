<script setup>
  import { useRoute } from "vue-router";
  import BooksList from "@/components/Books/BooksList/BooksList.vue"
  import Breadcrumbs from "@/components/Navigation/Breadcrumbs.vue";
  const route = useRoute();
  const { category } = route.params;
</script>
<template>
  <div>
    <div class="bg-slate-100 py-6">
      <div class="container mx-auto px-4">
        <Breadcrumbs :routes="[
            { title: 'Home', name: 'home' }, 
            { title: 'Books', name: 'books' }
          ]"
          :current-route="category"
        />
        <h1 class="mb-0 mt-4 text-slate-700 capitalize">{{ category }}</h1>
      </div>
    </div>
    <div class="container mx-auto px-4 py-8">
      <BooksList
        class="container mx-auto"
        :params="{
          order: JSON.stringify([['createdAt', 'DESC']]),
          category: category
        }"
      />
    </div>
  </div>
</template>

<style>

</style>
