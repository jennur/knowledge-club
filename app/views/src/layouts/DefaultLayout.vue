<script setup>
  import LeftMenu from "./Header/LeftMenu.vue";
  import RightMenu from "./Header/RightMenu.vue";

  import Footer from "./Footer/Footer.vue";
</script>

<template>
  <div id="default-layout" class="min-h-screen flex flex-col">
    <div class="border-b border-solid border-slate-100">
      <header class="outer-content-wrapper text-gray-600 py-1">
        <div class="flex justify-between">
        <LeftMenu />

        <RightMenu />
        </div>
      </header>
    </div>

    <main class="grow">
      <slot/>
    </main>
    
    <Footer />
  </div>
</template>