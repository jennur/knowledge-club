<script setup>
  import LeftMenu from "./Header/LeftMenu.vue";
  import RightMenu from "./Header/RightMenu.vue";
  import { RouterLink } from "vue-router";

  import Footer from "./Footer/Footer.vue";
</script>

<template>
  <div id="account-layout" class="min-h-screen flex flex-col">
    <div class="border-b border-solid border-slate-100">
      <header class="outer-content-wrapper text-gray-600 py-1">
        <div class="flex justify-between">
        <LeftMenu />

        <RightMenu />
        </div>
      </header>
    </div>

    <div class="outer-content-wrapper flex flex-col sm:flex-row items-start grow">
      <aside class="sidebar-menu mt-12">
        <nav>
          <RouterLink 
            class="link" 
            :to="{ name: 'account' }"
          >
            <font-awesome-icon icon="user" class="mr-1" />
            My profile
          </RouterLink>

          <RouterLink 
            class="link" 
            :to="{ name: 'account-saved-books' }"
          >
            <font-awesome-icon icon="book" class="mr-1" />
            Saved books
          </RouterLink>

          <RouterLink 
            class="link" 
            :to="{ name: 'account-settings' }"
          >
            <font-awesome-icon icon="cog" class="mr-1" />
            Settings
          </RouterLink>
        </nav>
      </aside>

      <main class="main-content grow mt-12">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<style lang="postcss" scoped>
  .sidebar-menu {
    @apply basis-1/4 xl:basis-1/5 border border-slate-100 rounded;
  }

  .sidebar-menu nav {
    @apply flex flex-col;
  }

  .sidebar-menu nav .link {
    @apply px-8 py-2 text-sm hover:bg-slate-100 transition-all border-slate-100 border-b last:border-b-0;
  }

  .main-content {
    @apply basis-3/4 xl:basis-4/5;
  }
</style>