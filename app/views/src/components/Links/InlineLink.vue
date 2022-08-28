<script setup>
  import { RouterLink } from "vue-router"

  const props = defineProps({
    path: String,
    linkText: String
  })
</script>

<template>
  <RouterLink :to="props.path" class="text-rose-500 underline hover:text-rose-700/90 transition-colors">
    {{ props.linkText }}
  </RouterLink>
</template>