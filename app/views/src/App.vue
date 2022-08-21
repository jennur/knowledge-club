<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import IconLink from "./components/Links/IconLink.vue"
  import { ref } from 'vue'
</script>

<template>
  <div>
    <header class="text-gray-600 p-1 border-b-2">
      <div class="flex items-center justify-between container mx-auto">
        <RouterLink to="/" class="text-xl">
          Knowledge Club
        </RouterLink>

        <nav class="flex">
          <IconLink path="/books" linkText="Books" iconClass="fa-solid fa-book" />
          <IconLink path="/account" linkText="Account" iconClass="fa-solid fa-user" />
          <IconLink path="/chat" linkText="Chat" iconClass="fa-solid fa-user" />
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

<style scoped>
</style>
