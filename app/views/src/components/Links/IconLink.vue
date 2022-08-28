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