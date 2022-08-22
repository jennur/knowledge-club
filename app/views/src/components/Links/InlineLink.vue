<script setup>
  import { RouterLink } from "vue-router"

  const props = defineProps({
    path: String,
    linkText: String
  })
</script>

<template>
  <RouterLink :to="props.path" class="text-gray-700 underline hover:text-gray-900/90">
    {{ props.linkText }}
  </RouterLink>
</template>