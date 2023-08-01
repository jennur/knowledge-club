<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex flex-1 items-center">
    <RouterLink to="/" class="flex flex-1 items-end py-2">
      <div class="logo-wrapper mr-1 mb-1">
        <img src="/yedia-logo-small.png" class="logo"/> 
      </div>
      <span class="title text-2xl text-rose-500">Yedia</span>
    </RouterLink>
  </nav>
</template>

<style lang="postcss" scoped>
  .logo-wrapper {
    height: 1.8rem;
    min-width: 1.72rem;
  }
  .logo {
    height: 1.8rem;
  }
  .title {
    font-family: "Baloo 2";
  }
</style>