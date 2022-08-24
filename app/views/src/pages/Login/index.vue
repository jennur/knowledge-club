<script setup>
  import { useRoute } from 'vue-router'
  import { ref } from "vue"
  import store  from "../../store/index"
  import Login from "../../components/Login/Login.vue"
  import InlineLink from "../../components/Links/InlineLink.vue"

  const route = useRoute();
  const fieldErrors = ref([]);
  const errorMsg = ref("");

  const signupSuccess = route.query.signup === "success";
  const message = signupSuccess && "You successfully registered, login with your credentials";

  async function login(username, password) {
    store.dispatch("auth/login", { username, password })
      .catch(err => {
        console.log("Login/index.vue error:", err);
        fieldErrors.value = err?.response?.data?.errors;
        errorMsg.value = err?.response?.data?.message;
      });
  }
</script>

<template>
  <div class="text-center">
    <h1 class="text-xl mt-6 mb-4">Log in</h1>
    <p v-if="message" class="text-sm text-slate-500 mb-6">{{ message }}</p>
    
    <Login @sendForm="login" :fieldErrors="fieldErrors" :errorMsg="errorMsg" />

    <p v-if="!message" class="text-sm mt-6">
      If you don't have an account yet, <InlineLink path="/signup" linkText="sign up!" />
    </p>
  </div>
</template>
