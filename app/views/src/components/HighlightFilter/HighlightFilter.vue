<script setup>
  import Switch from "../Inputs/Switch.vue";
  import { ref, computed } from 'vue'
  import store from "../../store/index";

  function toggleAllHighlights(visible) {
    store.dispatch("chapters/toggleAllHighlights", visible);
  }
  const highlightsOn = computed(() => store.state.chapters.focusedChapter?.visibleHighlights?.all);

</script>

<template>
  <div>
    <label class="flex items-center">
      <Switch class="mr-2" @switch="toggleAllHighlights" :checked="highlightsOn"/>
      <span class="">Show all highlights</span>
    </label>
  </div>
</template>

<style lang="postcss" scoped>

</style>