<script setup>
  import httpCommon from "../../../http-common";
  import Book from "../Book/Book.vue";
  import Spinner from "@/components/Loading/Spinner.vue";
  import IconLink from "@/components/Links/IconLink.vue";
  import { RouterLink } from "vue-router"
  import { ref, onBeforeMount } from "vue";

  const props = defineProps({
      headline: String,
      params: Object,
      manager: Boolean,
      gatewayRoute: Object,
  })

  const books = ref([]);
  const loading = ref(false);
  const errorMsg = ref(null);

  function getBookList() {
    loading.value = true;
    httpCommon.get("/books", { params: props.params })
      .then(response => {
        books.value = response.data;
        loading.value = false;
      })
      .catch(err => {
        console.error("[Y]", err.message);
        errorMsg.value = err.message
        loading.value = false;
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
      <IconLink
        v-if="gatewayRoute"
        :to="{ name: gatewayRoute.name }"
        iconClass="fa-solid fa-angle-right"
        :text="gatewayRoute.title"
        inlineLink
        animate
      />
    </div>
    
    <Spinner v-if="loading && !books.length" text="Loading books..." size="sm" class="ml-2 my-4" />
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
</style>