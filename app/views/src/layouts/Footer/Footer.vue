<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-blue-500 py-4">
    <div class="outer-content-wrapper">
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
</template>