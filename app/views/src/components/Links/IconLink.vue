<script setup>
import { RouterLink } from "vue-router"

const props = defineProps({
  path: String,
  iconClass: String,
  linkText: String
})
</script>

<template>
    <RouterLink :to="this.path" class="flex flex-col justify-center p-2 hover:text-gray-900/90">
        <font-awesome-icon :icon="this.iconClass" class="text-xl" />
        <div class="text-xs mt-1">{{ this.linkText }}</div>
    </RouterLink>
</template>