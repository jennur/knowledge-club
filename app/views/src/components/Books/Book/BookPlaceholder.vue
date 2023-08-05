<template>
  <div class="cover-image-container">
    <div class="loading-placeholder w-full bg-slate-300"></div>
    <div class="h-2 w-full bg-slate-300 mt-1"></div>
    <div class="h-2 w-3/4 bg-slate-300 mt-1"></div>
  </div>
</template>

<style lang="postcss" scoped>

  .cover-image-container {
    @apply relative mb-1 h-max grow m-2 animate-pulse;
  }
  .loading-placeholder {
    padding-bottom: 133%;
  }
</style>