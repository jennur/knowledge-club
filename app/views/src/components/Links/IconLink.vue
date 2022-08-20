<script setup>
import { RouterLink } from "vue-router"

const props = defineProps({
  path: String,
  iconClass: String,
  linkText: String
})
</script>

<template>
    <RouterLink :to="props.path" class="flex flex-col justify-center p-2 hover:text-gray-900/90">
        <font-awesome-icon :icon="props.iconClass" class="text-xl" />
        <div class="text-xs mt-1">{{ props.linkText }}</div>
    </RouterLink>
</template>