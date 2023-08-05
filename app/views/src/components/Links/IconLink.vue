<script setup>
  import { RouterLink } from "vue-router"

  const props = defineProps({
    to: Object,
    iconClass: String,
    text: String,
    inlineLink: Boolean,
    animate: Boolean
  })
</script>

<template>
  <RouterLink 
    :to="to" 
    :class="`
      ${animate ? 'animate ' : ''}
      ${inlineLink ? 'inline-link': 'icon-link'}
    `"
  >
    <font-awesome-icon v-if="!inlineLink" :icon="iconClass" class="icon" />
    {{ text }}
    <font-awesome-icon v-if="inlineLink" :icon="iconClass" class="icon" />
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

  .inline-link {
    @apply ml-2 text-xs text-rose-500 hover:text-rose-500/90 transition-colors;
  }

  .inline-link .icon {
    @apply text-xs;
  }

  .inline-link.animate:hover .icon {
    @apply animate-bounce-x;
  }
</style>