<script setup>
  import { RouterLink } from "vue-router"

  const props = defineProps({
    path: String,
    iconClass: String,
    linkText: String
  })
</script>

<template>
  <RouterLink :to="props.path" class="flex flex-col items-center p-2 hover:text-gray-900/90">
    <font-awesome-icon :icon="props.iconClass" class="text-xl mb-1" />
    <div class="text-xs">{{ props.linkText }}</div>
  </RouterLink>
</template>