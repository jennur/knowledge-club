<script setup>
  import { ref } from "vue";
  import store from "../../store/index"

  import SignUp from "../../components/SignUp/SignUp.vue"
  import InlineLink from "../../components/Links/InlineLink.vue"

  const fieldErrors = ref([]);
  const errorMsg = ref("");

  async function sendForm(credentials) {
    const { username, password, email } = credentials;

    store.dispatch("auth/register", credentials)
      .catch(err => {
        console.log("SignUp/index.vue error:", err);
        fieldErrors.value = err?.response?.data?.errors;
        errorMsg.value = err?.response?.data?.message;
      })
  }

</script>

<template>
  <div class="text-center">
    <h1 class="text-xl mt-6 mb-4">Sign up</h1>

    <SignUp @sendForm="sendForm" :fieldErrors="fieldErrors" :errorMsg="errorMsg" />

    <p class="text-sm mt-6">
      Do you already have an account? <InlineLink path="/login" linkText="Log in!" />
    </p>
  </div>
</template>