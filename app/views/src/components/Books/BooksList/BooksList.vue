<script setup>
  import httpCommon from "../../../http-common";
  import Book from "../Book/Book.vue";
  import BookPlaceholder from "../Book/BookPlaceholder.vue";
  import Spinner from "@/components/Loading/Spinner.vue";
  import IconLink from "@/components/Links/IconLink.vue";
  import { RouterLink } from "vue-router"
  import { ref, onBeforeMount } from "vue";

  const props = defineProps({
      headline: String,
      params: Object,
      manager: Boolean,
      gatewayRoute: Object,
      bookListClass: {
        type: String,
        default: "book-list"
      },
      bookWrapperBasisClass: {
        type: String,
        default: "book-wrapper"
      },
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
    <div v-if="headline" class="flex items-center ml-2 mb-4">
      <h2 class="text-xs text-slate-500 uppercase font-semibold">
        {{ headline }}
      </h2>

      <IconLink
        v-if="gatewayRoute"
        :to="{ name: gatewayRoute.name, params: gatewayRoute.params }"
        iconClass="fa-solid fa-angle-right"
        :text="gatewayRoute.title"
        inlineLink
        animate
      />
    </div>

    <div v-if="loading && !books.length" class="flex flex-wrap">
      <div  
        v-for="i in Array.from({length: params?.limit || 16})" 
        :key="i"
        :class="`flex mb-6 ${bookWrapperBasisClass}`"
      >
        <BookPlaceholder/>
      </div>
    </div>

    <p v-if="!books.length" class="text-sm text-gray-500 px-2 py-4">
      No available books yet
    </p>

    <div v-else :class="bookListClass">
      <div 
        v-for="book in books"
        :key="book.title"
        :class="`flex ${bookWrapperBasisClass}`"
      >
        <Book 
          :book="book"
          :category="params?.category"
          :manager="manager"
          @remove="getBookList"
        />
      </div>
    </div>
  </div>
</template>


<style lang="postcss" scoped>

  .book-list {
    @apply flex flex-wrap w-full;
  }

  .book-wrapper {
    @apply basis-1/2 sm:basis-1/4 lg:basis-1/8  
    max-w-[50%] sm:max-w-[25%] lg:max-w-[12.5%] grow;
  }
</style>