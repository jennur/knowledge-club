<script setup>
</script>

<template>
  <span class="quote">
      <slot />
  </span>
</template>

<style lang="postcss">

.quote::before {
  content: '«';
  @apply text-lg leading-4 text-slate-500 mr-1;
}
.quote::after {
  content: '»';
  @apply text-lg mt-2 leading-4 text-slate-500 ml-1;
}
</style>