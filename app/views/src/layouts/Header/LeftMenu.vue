<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex flex-1 items-center">
    <RouterLink to="/" class="flex flex-1 items-center py-2">
      <img src="/yedia-logo.svg" class="logo mr-1"/> 
      <span class="title text-lg lg:text-2xl text-rose-500">Yedia</span>
    </RouterLink>
  </nav>
</template>

<style lang="postcss" scoped>
  .logo {
    height: 1.8rem;
  }
  .title {
    font-family: "Itim";
  }
</style>