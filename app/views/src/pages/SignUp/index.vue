<script setup>
import SignUp from "../../components/SignUp/SignUp.vue"
import { ref } from "vue";
import { useRouter } from 'vue-router'
import http from "../../http-common";
import store from "../../store/index";

const router = useRouter();
const msg = ref("");

async function sendForm(credentials) {
  const { username, password, email } = credentials;

  store.dispatch("auth/register", credentials)
    .then(() => {
      router.push({ name: "login", params: { message: "You successfully registered, login with your credentials"} });
    })
    .catch(err => {
      msg.value = err.response?.data?.message || "Something went wrong, please contact us if the issue persists.";
    })
}

</script>

<template>
  <div class="">
    <h1 class="text-xl mt-6 mb-4 text-center">Sign up</h1>
    <SignUp @sendForm="sendForm" :msg="msg"/>
  </div>
</template>

<style>

</style>
