<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex flex-1 items-center">
    <RouterLink to="/" class="text-lg lg:text-xl text-rose-500 py-2">
      <font-awesome-icon icon="fas fa-spa" class="mr-2" />Knowledge Club
    </RouterLink>
  </nav>
</template>