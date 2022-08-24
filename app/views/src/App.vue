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
    <header class="text-gray-600 py-1 px-4 border-slate-200 border-b">
      <div class="flex items-center justify-between container mx-auto">
        <nav class="flex items-center">
          <RouterLink to="/" class="text-xl mr-6">Knowledge Club</RouterLink>
          <IconLink path="/books" linkText="Books" iconClass="fa-solid fa-book" />
        </nav>

        <nav class="flex">
          <div v-if="store.state.auth.user" class="flex items-center">
            <IconLink path="/chat" linkText="Chat" iconClass="fa-solid fa-comment" />
            <IconLink path="/account" linkText="Account" iconClass="fa-solid fa-user" />
            <IconButton vertical @click="store.dispatch('auth/logout')" buttonText="Log out" iconClass="fa-solid fa-right-from-bracket" />
          </div>
          <div v-else class="flex">
            <IconLink path="/signup" linkText="Sign up" iconClass="fa-solid fa-user-plus" />
            <IconLink path="/login" linkText="Login" iconClass="fa-solid fa-right-to-bracket" />
          </div>
        </nav>

      </div>
    </header>

    <div class="p-4">
      <main class="container mx-auto">
        <RouterView />
      </main>
    </div>

    <div class="p-4">
      <div class="container mx-auto">
        <footer>
        </footer>
      </div>
    </div>
  </div>
</template>
