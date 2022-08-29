<script setup>
  import { ref } from "vue";
  import Authenticate from "../components/Authenticate/Authenticate.vue";
  import BookList from "../components/Books/BooksList/BooksList.vue";
  import store from "../store/index";

  if(!store?.state?.books?.books[0]) store.dispatch("books/getAllBooks");
</script>

<template>
  <div>
    <div>
      <div v-if="!store.state?.auth?.user" class="bg-slate-100 cta-section px-4">
        <div class="flex flex-wrap container mx-auto py-16">
          <div class="basis-full md:basis-1/2 flex flex-col justify-center text-center md:text-left md:pr-8 pb-16 lg:p-16">
            <h1 class="text-4xl text-slate-700 mb-6">Learn anything, anytime</h1>
            <p class="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse vestibulum faucibus purus nec auctor. Cras feugiat 
              viverra blandit. 
            </p>
          </div>
          <div class="basis-full md:basis-1/2">
            <Authenticate
              class="w-full sm:w-4/5 md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto" 
            />
          </div>
        </div>
      </div>
      <div v-if="store?.state?.books?.books" class="bg-slate-50 p-4">
        <BookList
          class="container mx-auto"
          :books="store.state.books.books" 
          headline="Newly added books"
        />
      </div>
    </div>
  </div>
</template>
