<script setup>
  import { ref } from "vue";
  import store from "../../store/index"

  import SignUp from "../../components/SignUp/SignUp.vue"
  import InlineLink from "../../components/Links/InlineLink.vue"

  const msg = ref("");

  async function sendForm(credentials) {
    const { username, password, email } = credentials;

    store.dispatch("auth/register", credentials)
      .catch(err => {
        msg.value = err.response?.data?.message || "Something went wrong, please contact us if the issue persists.";
      })
  }

</script>

<template>
  <div class="text-center">
    <h1 class="text-xl mt-6 mb-4">Sign up</h1>

    <SignUp @sendForm="sendForm" :msg="msg"/>

    <p class="text-sm mt-6">
      Do you already have an account? <InlineLink path="/login" linkText="Log in!" />
    </p>
  </div>
</template>