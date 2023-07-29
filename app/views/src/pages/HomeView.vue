<script setup>
  import { ref } from "vue";
  import Authenticate from "../components/Authenticate/Authenticate.vue";
  import BookList from "../components/Books/BooksList/BooksList.vue";
  import NumberedList from "../components/List/NumberedList/NumberedList.vue";
  import store from "../store/index";
</script>

<template>
  <div>
    <div>
      <div v-if="!store.state?.auth?.user" class="bg-slate-100 cta-section px-4 py-16">
        <div class="flex flex-wrap container mx-auto">
          <div class="basis-full md:basis-1/2 flex flex-col justify-center text-center md:text-left md:pr-8 pb-16 lg:p-16">
            <h1 class="text-4xl text-slate-700 mb-6">Learn anything, anytime</h1>
            <p class="text-xl">
              Collaborate on learning documents with people who are interested in the same topics you are. 
            </p>
          </div>
          <div class="basis-full md:basis-1/2">
            <Authenticate
              class="w-full sm:w-4/5 md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto" 
            />
          </div>
        </div>
      </div>

      <div v-if="!store.state?.auth?.user" class="bg-blue-200 py-16">
        <div class="outer-content-wrapper flex flex-wrap">
          <div class="basis-full md:basis-1/2">
            <div class="h-96 bg-slate-100 md:mr-16">
              <p class="text-xs text-slate-400 p-8">Illustraton</p>
            </div>
          </div>
          <div class="basis-full flex items-center justify-center mt-16 md:basis-1/2 md:mt-0">
            <div>
              <h2 class="text-3xl text-slate-800 mb-8">Ways to Learn</h2>
              <NumberedList :listItems="[
                  'Use community documents',
                  'Highlight and make notes for yourself and others to read',
                  'Discuss each chapter in the chat',
                ]"
                fontSize="xxl"
                numberColor="blue"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="store.state?.books?.books" class="bg-slate-50 py-16">
        <BookList
          :params="{
            limit: 8,
            order: JSON.stringify([['createdAt', 'DESC']])
          }"
          class="outer-content-wrapper px-2"
          headline="Newly added books"
        />
      </div>
    </div>
  </div>
</template>
