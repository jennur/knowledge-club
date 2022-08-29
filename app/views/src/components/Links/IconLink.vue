<script setup>
  import { RouterLink } from "vue-router"

  const props = defineProps({
    path: String,
    iconClass: String,
    linkText: String
  })
</script>

<template>
  <RouterLink :to="props.path" class="icon-link">
    <font-awesome-icon :icon="props.iconClass" class="icon" />
    <div class="text">{{ props.linkText }}</div>
  </RouterLink>
</template>

<style lang="postcss" scoped>
  .icon-link {
    @apply flex flex-col items-center p-2 text-gray-700 hover:text-gray-900/90 transition-colors;
  }

  .icon-link .icon {
    @apply text-xl mb-1;
  }

  .icon-link .text {
    @apply text-xs;
  }
</style>