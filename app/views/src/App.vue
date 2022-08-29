<script setup>
  import { ref } from "vue";
  import { onMounted } from '@vue/runtime-core';
  import { RouterLink, RouterView } from 'vue-router'
  import IconLink from "./components/Links/IconLink.vue"
  import IconButton from "./components/Buttons/IconButton.vue"
  import store from "./store/index"

  const user = ref(store.state.auth.user);

</script>

<template>
  <div>
    <header class="text-gray-600 py-1 px-4">
      <div class="flex items-center justify-between container mx-auto">
        <nav class="flex items-center">
          <RouterLink to="/" class="text-xl text-rose-500 py-2 mr-6">
            <font-awesome-icon icon="fas fa-spa" class="mr-2" />Knowledge Club
          </RouterLink>
        </nav>

        <nav class="flex">
          <div v-if="store.state.auth.user" class="flex items-center">
            <IconLink path="/books" linkText="Books" iconClass="fa-solid fa-book" />
            <IconLink path="/chat" linkText="Chat" iconClass="fa-solid fa-comment" />
            <IconLink path="/account" linkText="Account" iconClass="fa-solid fa-user" />
            <IconButton vertical @click="store.dispatch('auth/logout')" buttonText="Log out" iconClass="fa-solid fa-right-from-bracket" />
          </div>
        </nav>

      </div>
    </header>

    <div class="">
      <main class="">
        <RouterView />
      </main>
    </div>

    <div class="bg-blue-500 p-4">
      <div class="container mx-auto">
        <footer class="text-sm text-white">
          <ul class="flex flex-wrap items-center">
            <li>
              <RouterLink to="/" class="py-2 mr-6">
                <font-awesome-icon icon="fas fa-spa" class="mr-2" />Knowledge Club
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'about' }">About</RouterLink>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>
