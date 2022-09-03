<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-blue-500 py-4">
    <div class="outer-content-wrapper">
      <footer class="text-sm text-white">
        <ul class="flex flex-wrap items-center">
          <li>
            <RouterLink to="/" class="flex flex-1 items-end pr-6">
              <img src="/yedia-logo_white.svg" class="logo m-[.15rem] mr-1"/>
              <span class="title text-lg text-white">Yedia</span>
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

<style lang="postcss" scoped>
  .logo {
    height: 1.7rem;
  }
  .title {
    font-family: "Baloo 2";
  }
</style>