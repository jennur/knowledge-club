<script setup>
  import Switch from "../FormFields/Switch.vue";
  import { ref } from 'vue'
  import store from "../../store/index";

  function toggleAllHighlights(visible) {
    store.dispatch("chapters/toggleAllHighlights", visible);
  }
</script>

<template>
  <div>
    <label class="flex items-center">
      <Switch class="mr-2" @switch="toggleAllHighlights" />
      <span class="">Show all highlights</span>
    </label>
  </div>
</template>

<style lang="postcss" scoped>

</style>