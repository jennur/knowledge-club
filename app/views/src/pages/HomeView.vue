<script setup>
  import { ref } from "vue";
  import Authenticate from "../components/Authenticate/Authenticate.vue";
  import store from "../store/index";

  const user = store.state?.auth?.user;
  console.log("User:", user);

</script>

<template>
  <div>
    <Authenticate v-if="!user" />
  </div>
</template>
