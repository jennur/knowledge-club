<script setup>
  import http from "../../../http-common";
  import { ref, onBeforeUnmount } from 'vue';

  const props = defineProps(["bookId"])
  
  const imageUrl = ref(null);
  const loading = ref(true)

  const baseUrl = import.meta.env.VITE_BASE_URL;

  http.get(`/book/cover-image?bookId=${props.bookId}`)
    .then((response) => {
      imageUrl.value = response.data;
      loading.value = false;
    })
    .catch((error) => {
      imageUrl.value = `${baseUrl}/placeholder.jpg`
      loading.value = false;
    })
</script>

<template>
  <div class="cover-image-container">
    <div class="loading-placeholder"></div>
    <img class="cover-image" :src="imageUrl" alt="" />
  </div>
</template>

<style lang="postcss" scoped>

  .cover-image-container {
    @apply relative mb-1 h-max;
  }
  .loading-placeholder {
    padding-bottom: 133%;
    @apply w-full bg-slate-200;
  }
  .cover-image {
    @apply absolute top-0 left-0 w-full;
  }
</style>