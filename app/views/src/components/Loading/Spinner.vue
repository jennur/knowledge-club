<script setup>
  const props = defineProps({
    text: String,
    size: { 
      type: String,
      default: () => "sm",
      validator: (value) => ["sm", "md"].includes(value)
    }
  })
</script>

<template>
  <div :class="`mt-1 text-blue-500 flex items-center ${size}`">
    <div class="spinner mr-2"></div>
    <p class="text">{{ text }}</p>
  </div>
</template>

<style lang="postcss" scoped>
  .spinner {
    @apply border-2 border-dotted border-spacing-1 border-blue-500 rounded-full animate-spin-slow;
  }

  .sm .spinner{
    @apply w-5 h-5 text-xs;
  }

  .sm .text {
    @apply text-xs;
  }

  .md .spinner {
    @apply w-7 h-7 border-4 text-sm;
  }
  .md .text {
    @apply text-sm;
  }
</style>