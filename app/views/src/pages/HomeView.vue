<script setup>
  import { ref } from "vue";
  import Authenticate from "../components/Authenticate/Authenticate.vue";
  import store from "../store/index";

</script>

<template>
  <div>
    <Authenticate v-if="!store.state?.auth?.user" />
  </div>
</template>
