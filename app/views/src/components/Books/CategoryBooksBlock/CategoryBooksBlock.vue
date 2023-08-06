<script setup>
  import BooksList from "../BooksList/BooksList.vue";

  const props = defineProps({
    category: String,
    headline: String,
    gatewayRouteName: String
  })
</script>

<template>
  <BooksList
    :params="{
      limit: 3,
      order: JSON.stringify([['createdAt', 'DESC']]),
      category: category
    }"
    class="featured-book-list"
    bookListClass="book-list"
    bookWrapperBasisClass="book-container"
    :headline="headline"
    :gatewayRoute="{ 
      name: 'category', 
      params: { category }, 
      title: 'See all books' 
    }"
  />
</template>

<style lang="postcss">
  .featured-book-list {
    @apply flex flex-col grow w-full
    basis-full sm:basis-1/2 md:basis-1/2 xl:basis-1/3
    sm:w-[49%] xl:w-[32%]
    sm:max-w-[49%] xl:max-w-[32%] p-4 bg-blue-50 rounded mb-4 xl:mb-0;
  }

  .book-list {
    @apply basis-full w-full flex items-baseline;
  }

  .book-container {
    @apply basis-1/2 max-w-[50%] md:basis-1/3 md:max-w-[33.33%] grow;
  }
</style>