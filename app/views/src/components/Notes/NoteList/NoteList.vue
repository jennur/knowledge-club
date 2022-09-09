<script setup>
import { ref } from 'vue'
import store from "@/store/index.js";

console.log("Store state:", store.state);
</script>

<template>
  <div>
    Note list component
  </div>
</template>