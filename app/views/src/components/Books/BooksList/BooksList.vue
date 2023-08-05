<script setup>
  import httpCommon from "../../../http-common";
  import Book from "../Book/Book.vue";
  import { RouterLink } from "vue-router"
  import { ref, onBeforeMount } from "vue";

  const props = defineProps({
      headline: String,
      params: Object,
      manager: Boolean,
      gatewayRoute: Object,
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
    <div class="flex items-center ml-2 mb-4">
      <h2 class="text-xs text-slate-500 uppercase font-semibold">
        {{ props.headline }}
      </h2>
      <RouterLink 
        v-if="gatewayRoute" 
        :to="{ name: gatewayRoute.name }"
        class="gateway-link"
      >
        {{ gatewayRoute.title }}
        <font-awesome-icon class="icon" :icon="['fas', 'angle-right']" />
      </RouterLink>
    </div>
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


<style lang="postcss" scoped>
  .gateway-link {
    @apply ml-2 text-xs text-blue-600;
  }

  .gateway-link:hover .icon {
    @apply animate-bounce-x;
  }
</style>