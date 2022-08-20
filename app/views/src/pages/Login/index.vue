<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from "vue"
import http from "../../http-common";
import store  from "../../store/index";
import Login from "../../components/Login/Login.vue"

const router = useRouter();
const route = useRoute();
const msg = ref("")

const message = route.params.message;

async function login(username, password) {
  store.dispatch("auth/login", { username, password })
    .then(() => {
      console.log("Logging in");
      router.push({ name: "account" });
    })
    .catch(err => {
      console.log(err);
      msg.value = err.response?.data?.message || "Something went wrong, please contact us if the issue persists.";
    });
}
</script>

<template>
  <div class="">
    <h1 class="text-xl mt-6 mb-4 text-center">Log in</h1>
    <p v-if="message" class="text-sm text-center text-slate-500 mb-6">{{ message }}</p>
    <Login @sendForm="login" :msg="msg" />
  </div>
</template>

<style>

</style>
