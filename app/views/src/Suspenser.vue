<script setup>
import App from './App.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <App />
    </template>
    <template #fallback>
      <div>
        <h1>Loading...</h1>
      </div>
    </template>
  </Suspense>
</template>
